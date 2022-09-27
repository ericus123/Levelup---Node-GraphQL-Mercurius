import jwt from "jsonwebtoken";
import fastify from "fastify";
import mercurius from "mercurius";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import mercuriusAuth from "mercurius-auth";

const port = process.env.PORT || 3000;

const app = fastify({ logger: true });

//activate plugins
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: "graphiql",
  queryDepth: 7,
});

// register auth policy

app.register(mercuriusAuth, {
  authContext(context) {
    return { identity: context.reply.request.headers["x-user"] };
  },
  async applyPolicy(authDirectiveAST, parent, args, context, info) {
    const token = context.auth.identity;
    try {
      const claim = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error(`An error occurred. Try again!`);
    }

    return true;
  },
  authDirective: "auth",
});

//create a server

const start = async () => {
  try {
    app.listen({ port: Number(port) }, (err, address) => {
      if (err) throw err;
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

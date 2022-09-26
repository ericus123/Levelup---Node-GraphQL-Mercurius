import fastify from "fastify";
import mercurius from "mercurius";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const port = process.env.PORT || 3000;

const app = fastify({ logger: true });

//activate plugins
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: "graphiql",
  queryDepth: 7,
});

//create a server

const start = async () => {
  try {
    app.listen({ port: 3000 }, (err, address) => {
      if (err) throw err;
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

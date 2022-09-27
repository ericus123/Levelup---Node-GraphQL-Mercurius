import jwt from "jsonwebtoken";
import users from "../constants/users";
import dotenv from "dotenv";

dotenv.config();

const resolvers = {
  Query: {
    users: async (_, obj) => users,

    user: async (_, { id }) => {
      let user = users.find((user) => user.id == id);
      if (!user) {
        throw new Error("unknown user");
      }
      return user;
    },

    login: async (_, { username, password }) => {
      let user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (!user) {
        throw new Error("unknown user!");
      }

      const token = jwt.sign(
        { username: user.username, password: user.password, role: user.role },
        process.env.JWT_SECRET
      );
      return token;
    },
  },
};

export default resolvers;

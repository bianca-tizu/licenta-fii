import questionResolver from "./questionResolver.js";
import userResolver from "./userResolver.js";
import commentsResolver from "./commentsResolver.js";

const resolvers = {
  Query: {
    ...questionResolver.Query,
    ...userResolver.Query,
    ...commentsResolver.Query,
  },
  Mutation: {
    ...questionResolver.Mutation,
    ...userResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};

export default resolvers;

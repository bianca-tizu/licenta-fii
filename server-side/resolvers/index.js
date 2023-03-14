import questionResolver from "./questionResolver.js";
import userResolver from "./userResolver.js";
import commentsResolver from "./commentsResolver.js";
import votesResolver from "./votesResolver.js";
import challengesResolver from "./challengesResolver.js";

const resolvers = {
  Query: {
    ...questionResolver.Query,
    ...userResolver.Query,
    ...commentsResolver.Query,
    ...votesResolver.Query,
    ...challengesResolver.Query,
  },
  Mutation: {
    ...questionResolver.Mutation,
    ...userResolver.Mutation,
    ...commentsResolver.Mutation,
    ...votesResolver.Mutation,
    ...challengesResolver.Mutation,
  },
};

export default resolvers;

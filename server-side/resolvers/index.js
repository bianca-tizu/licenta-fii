import questionResolver from "./questionResolver.js";
import userResolver from "./userResolver.js";
import commentsResolver from "./commentsResolver.js";
import votesResolver from "./votesResolver.js";
import challengesResolver from "./challengesResolver.js";
import notificationsResolver from "./notificationsResolver.js";

const resolvers = {
  Query: {
    ...questionResolver.Query,
    ...userResolver.Query,
    ...commentsResolver.Query,
    ...votesResolver.Query,
    ...challengesResolver.Query,
    ...notificationsResolver.Query,
  },
  Mutation: {
    ...questionResolver.Mutation,
    ...userResolver.Mutation,
    ...commentsResolver.Mutation,
    ...votesResolver.Mutation,
    ...challengesResolver.Mutation,
    ...notificationsResolver.Mutation,
  },
};

export default resolvers;

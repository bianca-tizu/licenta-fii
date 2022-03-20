import questionResolver from "./questionResolver.js";
import userResolver from "./userResolver.js";

const resolvers = {
  Query: {
    ...questionResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...questionResolver.Mutation,
    ...userResolver.Mutation,
  },
};

console.log(resolvers);

export default resolvers;

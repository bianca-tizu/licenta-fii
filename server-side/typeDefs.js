import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    email: String
    username: String
    password: String
    studentId: String
    avatarUrl: String
    questions: [Question]
  }

  type Question {
    id: ID
    author: User
    title: String
    category: String
    content: String
    votes: Int
    tags: [String]
  }

  type Query {
    hello: String
    helloUser: String

    getAllQuestions: [Question]
    getQuestion(id: ID): Question
  }

  input QuestionInput {
    title: String
    category: String
    content: String
    tags: [String]
  }

  input RegisterInput {
    email: String
    password: String
    studentId: String
  }

  type Mutation {
    createQuestion(question: QuestionInput): Question
    registerUser(user: RegisterInput): User
  }
`;

export default typeDefs;

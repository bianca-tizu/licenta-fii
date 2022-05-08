import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    studentId: String
    avatarUrl: String
    questions: [Question]
  }

  type Question {
    _id: ID
    author: User
    title: String
    category: String
    content: String
    votes: Int
    tags: [String]
    isDraft: Boolean
  }

  type Query {
    hello: String
    currentUser: User

    getAllQuestions: [Question]
    getQuestion(id: ID): Question
  }

  input QuestionInput {
    title: String
    category: String
    content: String
    tags: [String]
    isDraft: Boolean
  }

  input RegisterInput {
    email: String
    password: String
    studentId: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createQuestion(question: QuestionInput): Question
    registerUser(user: RegisterInput): AuthPayload!
    loginUser(user: LoginInput): AuthPayload!
  }
`;

export default typeDefs;

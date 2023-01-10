const typeDefs = `
  type User {
    _id: ID
    email: String
    username: String
    password: String
    studentId: String
    avatarUrl: String
    questions: [Question]
    resetPassToken: String
    resetPassExpire: String
  }

  type Question {
    _id: ID
    author: User
    title: String
    content: String
    votes: Int
    createdAt: String
    tags: [String]
    isDraft: Boolean
  }

  type Comment {
    _id: ID
    author: User
    message: String
    createdAt: String
    question: Question
  }

  type Query {
    hello: String
    getCurrentUser: User

    getAllQuestions: [Question]
    getQuestion(id: ID): Question
    searchQuestions(keyword: String): [Question]

    getCommentsForQuestion(questionId: ID): [Comment]
  }

  input QuestionInput {
    title: String
    content: String
    tags: [String]
    isDraft: Boolean
  }

  input CommentInput {
    message: String
    questionId: ID
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

  input UserInput {
    email: String
    username: String
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
    updateUser(user: UserInput): User
    forgetPassword(email: String): User!
    removeUser: ID
    deleteQuestion(id: ID): ID
    createComment(comment: CommentInput): Comment
    deleteComment(id: ID): ID
  }
`;

export default typeDefs;

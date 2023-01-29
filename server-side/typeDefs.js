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

  type Votes {
    _id: ID
    userId: ID
    questionId: ID
    voted: Boolean
  }

  type Questions {
    questions: [Question]
    questionsNo: Int
  }

  type Query {
    hello: String
    getCurrentUser: User

    getAllQuestions(limit: Int, offset: Int): Questions
    getQuestion(id: ID): Question
    searchQuestions(keyword: String): [Question]

    getCommentsForQuestion(questionId: ID): [Comment]

    isUserAlreadyVotedQuestion(questionId: ID): [Votes]
  }

  input QuestionInput {
    title: String
    content: String
    tags: [String]
    isDraft: Boolean
  }

  input UpdateQuestionInput {
    id: ID
    title: String
    content: String
    tags: [String]
    isDraft: Boolean
  }

  input CommentInput {
    message: String
    questionId: ID
  }

  input EditCommentInput {
    id: ID
    message: String
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
    deleteQuestion(id: ID): ID
    updateQuestion(question: UpdateQuestionInput): Question
    
    registerUser(user: RegisterInput): AuthPayload!
    loginUser(user: LoginInput): AuthPayload!
    updateUser(user: UserInput): User
    forgetPassword(email: String): User!
    removeUser: ID
    
    createComment(comment: CommentInput): Comment
    deleteComment(id: ID): ID
    editComment(comment: EditCommentInput): Comment

    countVotesForQuestion(questionId: ID): Int
  }
`;

export default typeDefs;

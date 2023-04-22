const typeDefs = `
  type User {
    _id: ID
    email: String
    username: String
    password: String
    studentId: String
    avatarUrl: String
    joinedRewardSystem: Boolean
    level: Int
    life: Int
    experience: Int
    challenges: [Challenges]
    questions: [Question]
    resetPassToken: String
    resetPassExpire: String
    loginTimestamp: String!
    challengesChecked: Boolean!
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

  type Challenges {
    _id: ID
    content: String
    status: String
    lookupId: Int
    isSystemChallenge: Boolean
    author: User
  }

  type NotificationMessage {
    message: String
  }

  type MappedChallenges {
    _id: ID
    challenges: [Challenges]
    notifications: [Notification]
  }

  type Questions {
    questions: [Question]
    questionsNo: Int
  }

  type Notification {
    message: String
    type: String
    seen: Boolean
  }

  type Query {
    hello: String
    getCurrentUser: User

    getAllQuestions(limit: Int, offset: Int): Questions
    getAllDraftsQuestions: [Question]
    getQuestion(id: ID): Question
    searchQuestions(keyword: String): [Question]

    getCommentsForQuestion(questionId: ID): [Comment]

    isUserAlreadyVotedQuestion(questionId: ID): [Votes]

    getSystemChallenges: [Challenges]
    mapSystemChallengesToUser: MappedChallenges
    checkAndUpdateSystemChallengesStatus: [String]

    getAllNotifications: [Notification]

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

  input ChallengeInput{
    isSystemChallenge: Boolean!
    content: String!
  } 
  
  input NotificationInput{
    message: String
    type: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Questions {
    question: Question
    notifications: Notification
  }

  type Mutation {
    createQuestion(question: QuestionInput): Questions
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

    joinRewardSystem: User

    createChallenge(challenge: ChallengeInput): Challenges
    createNotification(notification: NotificationInput): Notification
  }
`;

export default typeDefs;

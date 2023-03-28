import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type ChallengeInput = {
  content?: Maybe<Scalars['String']>;
  isSystemChallenge: Scalars['Boolean'];
  title: Scalars['String'];
};

export type Challenges = {
  __typename?: 'Challenges';
  _id?: Maybe<Scalars['ID']>;
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  isSystemChallenge?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id?: Maybe<Scalars['ID']>;
  author?: Maybe<User>;
  createdAt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  question?: Maybe<Question>;
};

export type CommentInput = {
  message?: Maybe<Scalars['String']>;
  questionId?: Maybe<Scalars['ID']>;
};

export type EditCommentInput = {
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  countVotesForQuestion?: Maybe<Scalars['Int']>;
  createChallenge?: Maybe<Challenges>;
  createComment?: Maybe<Comment>;
  createQuestion?: Maybe<Question>;
  deleteComment?: Maybe<Scalars['ID']>;
  deleteQuestion?: Maybe<Scalars['ID']>;
  editComment?: Maybe<Comment>;
  forgetPassword: User;
  joinRewardSystem?: Maybe<User>;
  loginUser: AuthPayload;
  registerUser: AuthPayload;
  removeUser?: Maybe<Scalars['ID']>;
  updateQuestion?: Maybe<Question>;
  updateUser?: Maybe<User>;
};


export type MutationCountVotesForQuestionArgs = {
  questionId?: Maybe<Scalars['ID']>;
};


export type MutationCreateChallengeArgs = {
  challenge?: Maybe<ChallengeInput>;
};


export type MutationCreateCommentArgs = {
  comment?: Maybe<CommentInput>;
};


export type MutationCreateQuestionArgs = {
  question?: Maybe<QuestionInput>;
};


export type MutationDeleteCommentArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationDeleteQuestionArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationEditCommentArgs = {
  comment?: Maybe<EditCommentInput>;
};


export type MutationForgetPasswordArgs = {
  email?: Maybe<Scalars['String']>;
};


export type MutationLoginUserArgs = {
  user?: Maybe<LoginInput>;
};


export type MutationRegisterUserArgs = {
  user?: Maybe<RegisterInput>;
};


export type MutationUpdateQuestionArgs = {
  question?: Maybe<UpdateQuestionInput>;
};


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  checkAndUpdateSystemChallengesStatus?: Maybe<Challenges>;
  getAllDraftsQuestions?: Maybe<Array<Maybe<Question>>>;
  getAllQuestions?: Maybe<Questions>;
  getCommentsForQuestion?: Maybe<Array<Maybe<Comment>>>;
  getCurrentUser?: Maybe<User>;
  getQuestion?: Maybe<Question>;
  getSystemChallenges?: Maybe<Array<Maybe<Challenges>>>;
  hello?: Maybe<Scalars['String']>;
  isUserAlreadyVotedQuestion?: Maybe<Array<Maybe<Votes>>>;
  mapSystemChallengesToUser?: Maybe<Array<Maybe<Challenges>>>;
  searchQuestions?: Maybe<Array<Maybe<Question>>>;
};


export type QueryGetAllQuestionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetCommentsForQuestionArgs = {
  questionId?: Maybe<Scalars['ID']>;
};


export type QueryGetQuestionArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryIsUserAlreadyVotedQuestionArgs = {
  questionId?: Maybe<Scalars['ID']>;
};


export type QuerySearchQuestionsArgs = {
  keyword?: Maybe<Scalars['String']>;
};

export type Question = {
  __typename?: 'Question';
  _id?: Maybe<Scalars['ID']>;
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  isDraft?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

export type QuestionInput = {
  content?: Maybe<Scalars['String']>;
  isDraft?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type Questions = {
  __typename?: 'Questions';
  questions?: Maybe<Array<Maybe<Question>>>;
  questionsNo?: Maybe<Scalars['Int']>;
};

export type RegisterInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['String']>;
};

export type UpdateQuestionInput = {
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isDraft?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  avatarUrl?: Maybe<Scalars['String']>;
  challenges?: Maybe<Array<Maybe<Challenges>>>;
  email?: Maybe<Scalars['String']>;
  experience?: Maybe<Scalars['Int']>;
  joinedRewardSystem?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  life?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  questions?: Maybe<Array<Maybe<Question>>>;
  resetPassExpire?: Maybe<Scalars['String']>;
  resetPassToken?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Votes = {
  __typename?: 'Votes';
  _id?: Maybe<Scalars['ID']>;
  questionId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  voted?: Maybe<Scalars['Boolean']>;
};

export type CountVotesForQuestionMutationVariables = Exact<{
  questionId?: Maybe<Scalars['ID']>;
}>;


export type CountVotesForQuestionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'countVotesForQuestion'>
);

export type CreateCommentMutationVariables = Exact<{
  questionId?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'message' | 'createdAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username' | 'avatarUrl'>
    )>, question?: Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, '_id'>
    )> }
  )> }
);

export type CreateQuestionMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']> | Scalars['String'];
  isDraft?: Maybe<Scalars['Boolean']>;
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, '_id' | 'title' | 'content' | 'votes' | 'tags' | 'isDraft'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl'>
    )> }
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteQuestionMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type DeleteQuestionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteQuestion'>
);

export type EditCommentMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
}>;


export type EditCommentMutation = (
  { __typename?: 'Mutation' }
  & { editComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'message'>
  )> }
);

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgetPassword: (
    { __typename?: 'User' }
    & Pick<User, 'resetPassToken'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'joinedRewardSystem'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  sid: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type RemoveUserMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUser'>
);

export type UpdateQuestionMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']> | Scalars['String'];
  isDraft?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { updateQuestion?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, '_id' | 'title' | 'content' | 'votes' | 'tags' | 'isDraft'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'username'>
  )> }
);

export type JoinRewardSystemMutationVariables = Exact<{ [key: string]: never; }>;


export type JoinRewardSystemMutation = (
  { __typename?: 'Mutation' }
  & { joinRewardSystem?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'joinedRewardSystem'>
  )> }
);

export type GetAllDraftsQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDraftsQuestionsQuery = (
  { __typename?: 'Query' }
  & { getAllDraftsQuestions?: Maybe<Array<Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'title' | '_id' | 'content' | 'votes' | 'tags' | 'isDraft'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl'>
    )> }
  )>>> }
);

export type GetCommentsForQuestionQueryVariables = Exact<{
  questionId?: Maybe<Scalars['ID']>;
}>;


export type GetCommentsForQuestionQuery = (
  { __typename?: 'Query' }
  & { getCommentsForQuestion?: Maybe<Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'message' | 'createdAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl' | 'username'>
    )>, question?: Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, '_id'>
    )> }
  )>>> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'avatarUrl' | 'username' | 'studentId' | 'email' | 'life' | 'level' | 'experience'>
  )> }
);

export type GetSystemChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSystemChallengesQuery = (
  { __typename?: 'Query' }
  & { getSystemChallenges?: Maybe<Array<Maybe<(
    { __typename?: 'Challenges' }
    & Pick<Challenges, '_id' | 'content' | 'status'>
  )>>> }
);

export type IsUserAlreadyVotedQuestionQueryVariables = Exact<{
  questionId?: Maybe<Scalars['ID']>;
}>;


export type IsUserAlreadyVotedQuestionQuery = (
  { __typename?: 'Query' }
  & { isUserAlreadyVotedQuestion?: Maybe<Array<Maybe<(
    { __typename?: 'Votes' }
    & Pick<Votes, 'voted'>
  )>>> }
);

export type MapSystemChallengesToUseQueryVariables = Exact<{ [key: string]: never; }>;


export type MapSystemChallengesToUseQuery = (
  { __typename?: 'Query' }
  & { mapSystemChallengesToUser?: Maybe<Array<Maybe<(
    { __typename?: 'Challenges' }
    & Pick<Challenges, '_id' | 'content' | 'status'>
  )>>> }
);

export type QuestionsQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { getAllQuestions?: Maybe<(
    { __typename?: 'Questions' }
    & Pick<Questions, 'questionsNo'>
    & { questions?: Maybe<Array<Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, 'title' | '_id' | 'content' | 'votes' | 'tags' | 'isDraft'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, '_id' | 'avatarUrl'>
      )> }
    )>>> }
  )> }
);

export type SearchQuestionsQueryVariables = Exact<{
  keyword?: Maybe<Scalars['String']>;
}>;


export type SearchQuestionsQuery = (
  { __typename?: 'Query' }
  & { searchQuestions?: Maybe<Array<Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'title' | '_id' | 'content' | 'votes' | 'tags' | 'isDraft'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl'>
    )> }
  )>>> }
);


export const CountVotesForQuestionDocument = gql`
    mutation CountVotesForQuestion($questionId: ID) {
  countVotesForQuestion(questionId: $questionId)
}
    `;
export type CountVotesForQuestionMutationFn = Apollo.MutationFunction<CountVotesForQuestionMutation, CountVotesForQuestionMutationVariables>;

/**
 * __useCountVotesForQuestionMutation__
 *
 * To run a mutation, you first call `useCountVotesForQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCountVotesForQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [countVotesForQuestionMutation, { data, loading, error }] = useCountVotesForQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useCountVotesForQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CountVotesForQuestionMutation, CountVotesForQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CountVotesForQuestionMutation, CountVotesForQuestionMutationVariables>(CountVotesForQuestionDocument, options);
      }
export type CountVotesForQuestionMutationHookResult = ReturnType<typeof useCountVotesForQuestionMutation>;
export type CountVotesForQuestionMutationResult = Apollo.MutationResult<CountVotesForQuestionMutation>;
export type CountVotesForQuestionMutationOptions = Apollo.BaseMutationOptions<CountVotesForQuestionMutation, CountVotesForQuestionMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($questionId: ID, $message: String) {
  createComment(comment: {questionId: $questionId, message: $message}) {
    _id
    author {
      _id
      username
      avatarUrl
    }
    question {
      _id
    }
    message
    createdAt
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($title: String, $content: String, $tags: [String!]!, $isDraft: Boolean) {
  createQuestion(
    question: {title: $title, content: $content, tags: $tags, isDraft: $isDraft}
  ) {
    _id
    title
    content
    author {
      _id
      avatarUrl
    }
    votes
    tags
    isDraft
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      isDraft: // value for 'isDraft'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: ID) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($id: ID) {
  deleteQuestion(id: $id)
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($id: ID, $message: String) {
  editComment(comment: {id: $id, message: $message}) {
    _id
    message
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email) {
    resetPassToken
  }
}
    `;
export type ForgetPasswordMutationFn = Apollo.MutationFunction<ForgetPasswordMutation, ForgetPasswordMutationVariables>;

/**
 * __useForgetPasswordMutation__
 *
 * To run a mutation, you first call `useForgetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgetPasswordMutation, { data, loading, error }] = useForgetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgetPasswordMutation, ForgetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument, options);
      }
export type ForgetPasswordMutationHookResult = ReturnType<typeof useForgetPasswordMutation>;
export type ForgetPasswordMutationResult = Apollo.MutationResult<ForgetPasswordMutation>;
export type ForgetPasswordMutationOptions = Apollo.BaseMutationOptions<ForgetPasswordMutation, ForgetPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(user: {email: $email, password: $password}) {
    token
    user {
      joinedRewardSystem
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($sid: String!, $email: String!, $password: String!) {
  registerUser(user: {studentId: $sid, email: $email, password: $password}) {
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      sid: // value for 'sid'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser {
  removeUser
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($id: ID, $title: String, $content: String, $tags: [String!]!, $isDraft: Boolean) {
  updateQuestion(
    question: {id: $id, title: $title, content: $content, tags: $tags, isDraft: $isDraft}
  ) {
    _id
    title
    content
    author {
      _id
      avatarUrl
    }
    votes
    tags
    isDraft
  }
}
    `;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      isDraft: // value for 'isDraft'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String, $username: String, $password: String) {
  updateUser(user: {email: $email, username: $username, password: $password}) {
    email
    username
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const JoinRewardSystemDocument = gql`
    mutation JoinRewardSystem {
  joinRewardSystem {
    _id
    joinedRewardSystem
  }
}
    `;
export type JoinRewardSystemMutationFn = Apollo.MutationFunction<JoinRewardSystemMutation, JoinRewardSystemMutationVariables>;

/**
 * __useJoinRewardSystemMutation__
 *
 * To run a mutation, you first call `useJoinRewardSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRewardSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRewardSystemMutation, { data, loading, error }] = useJoinRewardSystemMutation({
 *   variables: {
 *   },
 * });
 */
export function useJoinRewardSystemMutation(baseOptions?: Apollo.MutationHookOptions<JoinRewardSystemMutation, JoinRewardSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinRewardSystemMutation, JoinRewardSystemMutationVariables>(JoinRewardSystemDocument, options);
      }
export type JoinRewardSystemMutationHookResult = ReturnType<typeof useJoinRewardSystemMutation>;
export type JoinRewardSystemMutationResult = Apollo.MutationResult<JoinRewardSystemMutation>;
export type JoinRewardSystemMutationOptions = Apollo.BaseMutationOptions<JoinRewardSystemMutation, JoinRewardSystemMutationVariables>;
export const GetAllDraftsQuestionsDocument = gql`
    query GetAllDraftsQuestions {
  getAllDraftsQuestions {
    title
    _id
    author {
      _id
      avatarUrl
    }
    content
    votes
    tags
    isDraft
  }
}
    `;

/**
 * __useGetAllDraftsQuestionsQuery__
 *
 * To run a query within a React component, call `useGetAllDraftsQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDraftsQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDraftsQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDraftsQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDraftsQuestionsQuery, GetAllDraftsQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDraftsQuestionsQuery, GetAllDraftsQuestionsQueryVariables>(GetAllDraftsQuestionsDocument, options);
      }
export function useGetAllDraftsQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDraftsQuestionsQuery, GetAllDraftsQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDraftsQuestionsQuery, GetAllDraftsQuestionsQueryVariables>(GetAllDraftsQuestionsDocument, options);
        }
export type GetAllDraftsQuestionsQueryHookResult = ReturnType<typeof useGetAllDraftsQuestionsQuery>;
export type GetAllDraftsQuestionsLazyQueryHookResult = ReturnType<typeof useGetAllDraftsQuestionsLazyQuery>;
export type GetAllDraftsQuestionsQueryResult = Apollo.QueryResult<GetAllDraftsQuestionsQuery, GetAllDraftsQuestionsQueryVariables>;
export const GetCommentsForQuestionDocument = gql`
    query GetCommentsForQuestion($questionId: ID) {
  getCommentsForQuestion(questionId: $questionId) {
    _id
    message
    author {
      _id
      avatarUrl
      username
    }
    question {
      _id
    }
    createdAt
  }
}
    `;

/**
 * __useGetCommentsForQuestionQuery__
 *
 * To run a query within a React component, call `useGetCommentsForQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useGetCommentsForQuestionQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsForQuestionQuery, GetCommentsForQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsForQuestionQuery, GetCommentsForQuestionQueryVariables>(GetCommentsForQuestionDocument, options);
      }
export function useGetCommentsForQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsForQuestionQuery, GetCommentsForQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsForQuestionQuery, GetCommentsForQuestionQueryVariables>(GetCommentsForQuestionDocument, options);
        }
export type GetCommentsForQuestionQueryHookResult = ReturnType<typeof useGetCommentsForQuestionQuery>;
export type GetCommentsForQuestionLazyQueryHookResult = ReturnType<typeof useGetCommentsForQuestionLazyQuery>;
export type GetCommentsForQuestionQueryResult = Apollo.QueryResult<GetCommentsForQuestionQuery, GetCommentsForQuestionQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    _id
    avatarUrl
    username
    studentId
    email
    life
    level
    experience
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetSystemChallengesDocument = gql`
    query GetSystemChallenges {
  getSystemChallenges {
    _id
    content
    status
  }
}
    `;

/**
 * __useGetSystemChallengesQuery__
 *
 * To run a query within a React component, call `useGetSystemChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemChallengesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSystemChallengesQuery(baseOptions?: Apollo.QueryHookOptions<GetSystemChallengesQuery, GetSystemChallengesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSystemChallengesQuery, GetSystemChallengesQueryVariables>(GetSystemChallengesDocument, options);
      }
export function useGetSystemChallengesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSystemChallengesQuery, GetSystemChallengesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSystemChallengesQuery, GetSystemChallengesQueryVariables>(GetSystemChallengesDocument, options);
        }
export type GetSystemChallengesQueryHookResult = ReturnType<typeof useGetSystemChallengesQuery>;
export type GetSystemChallengesLazyQueryHookResult = ReturnType<typeof useGetSystemChallengesLazyQuery>;
export type GetSystemChallengesQueryResult = Apollo.QueryResult<GetSystemChallengesQuery, GetSystemChallengesQueryVariables>;
export const IsUserAlreadyVotedQuestionDocument = gql`
    query IsUserAlreadyVotedQuestion($questionId: ID) {
  isUserAlreadyVotedQuestion(questionId: $questionId) {
    voted
  }
}
    `;

/**
 * __useIsUserAlreadyVotedQuestionQuery__
 *
 * To run a query within a React component, call `useIsUserAlreadyVotedQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserAlreadyVotedQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserAlreadyVotedQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useIsUserAlreadyVotedQuestionQuery(baseOptions?: Apollo.QueryHookOptions<IsUserAlreadyVotedQuestionQuery, IsUserAlreadyVotedQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserAlreadyVotedQuestionQuery, IsUserAlreadyVotedQuestionQueryVariables>(IsUserAlreadyVotedQuestionDocument, options);
      }
export function useIsUserAlreadyVotedQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserAlreadyVotedQuestionQuery, IsUserAlreadyVotedQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserAlreadyVotedQuestionQuery, IsUserAlreadyVotedQuestionQueryVariables>(IsUserAlreadyVotedQuestionDocument, options);
        }
export type IsUserAlreadyVotedQuestionQueryHookResult = ReturnType<typeof useIsUserAlreadyVotedQuestionQuery>;
export type IsUserAlreadyVotedQuestionLazyQueryHookResult = ReturnType<typeof useIsUserAlreadyVotedQuestionLazyQuery>;
export type IsUserAlreadyVotedQuestionQueryResult = Apollo.QueryResult<IsUserAlreadyVotedQuestionQuery, IsUserAlreadyVotedQuestionQueryVariables>;
export const MapSystemChallengesToUseDocument = gql`
    query MapSystemChallengesToUse {
  mapSystemChallengesToUser {
    _id
    content
    status
  }
}
    `;

/**
 * __useMapSystemChallengesToUseQuery__
 *
 * To run a query within a React component, call `useMapSystemChallengesToUseQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapSystemChallengesToUseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapSystemChallengesToUseQuery({
 *   variables: {
 *   },
 * });
 */
export function useMapSystemChallengesToUseQuery(baseOptions?: Apollo.QueryHookOptions<MapSystemChallengesToUseQuery, MapSystemChallengesToUseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MapSystemChallengesToUseQuery, MapSystemChallengesToUseQueryVariables>(MapSystemChallengesToUseDocument, options);
      }
export function useMapSystemChallengesToUseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MapSystemChallengesToUseQuery, MapSystemChallengesToUseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MapSystemChallengesToUseQuery, MapSystemChallengesToUseQueryVariables>(MapSystemChallengesToUseDocument, options);
        }
export type MapSystemChallengesToUseQueryHookResult = ReturnType<typeof useMapSystemChallengesToUseQuery>;
export type MapSystemChallengesToUseLazyQueryHookResult = ReturnType<typeof useMapSystemChallengesToUseLazyQuery>;
export type MapSystemChallengesToUseQueryResult = Apollo.QueryResult<MapSystemChallengesToUseQuery, MapSystemChallengesToUseQueryVariables>;
export const QuestionsDocument = gql`
    query Questions($offset: Int, $limit: Int) {
  getAllQuestions(offset: $offset, limit: $limit) {
    questions {
      title
      _id
      author {
        _id
        avatarUrl
      }
      content
      votes
      tags
      isDraft
    }
    questionsNo
  }
}
    `;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const SearchQuestionsDocument = gql`
    query SearchQuestions($keyword: String) {
  searchQuestions(keyword: $keyword) {
    title
    _id
    author {
      _id
      avatarUrl
    }
    content
    votes
    tags
    isDraft
  }
}
    `;

/**
 * __useSearchQuestionsQuery__
 *
 * To run a query within a React component, call `useSearchQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuestionsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, options);
      }
export function useSearchQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, options);
        }
export type SearchQuestionsQueryHookResult = ReturnType<typeof useSearchQuestionsQuery>;
export type SearchQuestionsLazyQueryHookResult = ReturnType<typeof useSearchQuestionsLazyQuery>;
export type SearchQuestionsQueryResult = Apollo.QueryResult<SearchQuestionsQuery, SearchQuestionsQueryVariables>;
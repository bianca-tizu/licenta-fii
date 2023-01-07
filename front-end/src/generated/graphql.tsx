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

export type LoginInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createQuestion?: Maybe<Question>;
  deleteQuestion?: Maybe<Scalars['ID']>;
  forgetPassword: User;
  loginUser: AuthPayload;
  registerUser: AuthPayload;
  removeUser?: Maybe<Scalars['ID']>;
  updateUser?: Maybe<User>;
};


export type MutationCreateCommentArgs = {
  comment?: Maybe<CommentInput>;
};


export type MutationCreateQuestionArgs = {
  question?: Maybe<QuestionInput>;
};


export type MutationDeleteQuestionArgs = {
  id?: Maybe<Scalars['ID']>;
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


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllComments?: Maybe<Array<Maybe<Comment>>>;
  getAllQuestions?: Maybe<Array<Maybe<Question>>>;
  getCurrentUser?: Maybe<User>;
  getQuestion?: Maybe<Question>;
  hello?: Maybe<Scalars['String']>;
  searchQuestions?: Maybe<Array<Maybe<Question>>>;
};


export type QueryGetQuestionArgs = {
  id?: Maybe<Scalars['ID']>;
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

export type RegisterInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  commentAdded?: Maybe<Comment>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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

export type CreateCommentMutationVariables = Exact<{
  questionId?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'message'>
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

export type DeleteQuestionMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type DeleteQuestionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteQuestion'>
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'avatarUrl' | 'username' | 'studentId' | 'email'>
  )> }
);

export type QuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { getAllQuestions?: Maybe<Array<Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'title' | '_id' | 'content' | 'votes' | 'tags' | 'isDraft'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'avatarUrl'>
    )> }
  )>>> }
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

export type CommentAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CommentAddedSubscription = (
  { __typename?: 'Subscription' }
  & { commentAdded?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id'>
    )>, question?: Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, '_id'>
    )> }
  )> }
);


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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    _id
    avatarUrl
    username
    studentId
    email
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
export const QuestionsDocument = gql`
    query Questions {
  getAllQuestions {
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
export const CommentAddedDocument = gql`
    subscription CommentAdded {
  commentAdded {
    _id
    author {
      _id
    }
    question {
      _id
    }
  }
}
    `;

/**
 * __useCommentAddedSubscription__
 *
 * To run a query within a React component, call `useCommentAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCommentAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CommentAddedSubscription, CommentAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentAddedSubscription, CommentAddedSubscriptionVariables>(CommentAddedDocument, options);
      }
export type CommentAddedSubscriptionHookResult = ReturnType<typeof useCommentAddedSubscription>;
export type CommentAddedSubscriptionResult = Apollo.SubscriptionResult<CommentAddedSubscription>;
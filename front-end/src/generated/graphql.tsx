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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
  createQuestion: Question;
  updateQuestion?: Maybe<Question>;
  deleteQuestion: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  studentId: Scalars['String'];
  input: LoginInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreateQuestionArgs = {
  title: Scalars['String'];
};


export type MutationUpdateQuestionArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  isUserLogged?: Maybe<User>;
  questions: Array<Question>;
  question?: Maybe<Question>;
};


export type QueryQuestionArgs = {
  id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String'];
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  votes: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  studentId: Scalars['String'];
  session: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  sid: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'createdAt' | 'updatedAt' | 'studentId' | 'username'>
    )> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($sid: String!, $email: String!, $password: String!) {
  register(studentId: $sid, input: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      email
      createdAt
      updatedAt
      studentId
      username
    }
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
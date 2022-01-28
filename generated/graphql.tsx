import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddMemberResponse = {
  __typename?: 'AddMemberResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AuthCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  teamId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  channelId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember: AddMemberResponse;
  createChannel: CreateChannelResponse;
  createMessage: Scalars['Boolean'];
  createTeam: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
  updateChannel: Scalars['Boolean'];
};


export type MutationAddMemberArgs = {
  email: Scalars['String'];
  teamId: Scalars['Float'];
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
  teamId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: AuthCredentials;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateChannelArgs = {
  channelId: Scalars['Float'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getChannel: Channel;
  getMembers: Array<Member>;
  me?: Maybe<User>;
  team: Team;
  teams: TeamResponse;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryTeamArgs = {
  teamId: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  channels?: Maybe<Array<Channel>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  ownerId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type TeamResponse = {
  __typename?: 'TeamResponse';
  teamsInvited?: Maybe<Array<Member>>;
  teamsOwned?: Maybe<Array<Team>>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  tokenVersion: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  access_token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ErrorField>>;
  user?: Maybe<User>;
};

export type ErrorInfosFragment = { __typename?: 'ErrorField', field: string, message: string };

export type UserInfosFragment = { __typename?: 'User', id: number, username: string, email: string };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', access_token?: string | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined, errors?: Array<{ __typename?: 'ErrorField', field: string, message: string }> | null | undefined } };

export type RegisterMutationVariables = Exact<{
  options: AuthCredentials;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', access_token?: string | null | undefined, errors?: Array<{ __typename?: 'ErrorField', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: { __typename?: 'TeamResponse', teamsOwned?: Array<{ __typename?: 'Team', id: number, name: string, ownerId: number, channels?: Array<{ __typename?: 'Channel', id: number, name: string }> | null | undefined }> | null | undefined, teamsInvited?: Array<{ __typename?: 'Member', team?: { __typename?: 'Team', id: number, name: string, ownerId: number, channels?: Array<{ __typename?: 'Channel', id: number, name: string }> | null | undefined } | null | undefined }> | null | undefined } };

export const ErrorInfosFragmentDoc = gql`
    fragment ErrorInfos on ErrorField {
  field
  message
}
    `;
export const UserInfosFragmentDoc = gql`
    fragment UserInfos on User {
  id
  username
  email
}
    `;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(name: $name)
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    user {
      ...UserInfos
    }
    errors {
      field
      message
    }
    access_token
  }
}
    ${UserInfosFragmentDoc}`;
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
 *      password: // value for 'password'
 *      username: // value for 'username'
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
    mutation Register($options: AuthCredentials!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...UserInfos
    }
    access_token
  }
}
    ${UserInfosFragmentDoc}`;
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
 *      options: // value for 'options'
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
export const MeDocument = gql`
    query Me {
  me {
    ...UserInfos
  }
}
    ${UserInfosFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    teamsOwned {
      id
      name
      ownerId
      channels {
        id
        name
      }
    }
    teamsInvited {
      team {
        id
        name
        ownerId
        channels {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
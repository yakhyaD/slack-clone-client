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
  getTeam: Team;
  getTeams: TeamResponse;
  me: Scalars['String'];
};


export type QueryGetChannelArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetTeamArgs = {
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: string };


export const MeDocument = gql`
    query Me {
  me
}
    `;

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
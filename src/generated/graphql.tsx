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
};

export type Image = {
  __typename: 'Image';
  fileName: Scalars['String'];
  id: Scalars['String'];
  imageType: ImageType;
  imgUrl: Scalars['String'];
  pk: Scalars['String'];
  user: User;
  verified: Scalars['Boolean'];
  verifiedAt: Scalars['String'];
};

export type ImageType =
  | 'DUCK'
  | 'UNKNOWN';

export type Mutation = {
  __typename: 'Mutation';
  undoVerifyImage: Image;
  verifyImage: Image;
};


export type MutationUndoVerifyImageArgs = {
  id: Scalars['ID'];
};


export type MutationVerifyImageArgs = {
  id: Scalars['ID'];
  imageType?: InputMaybe<ImageType>;
};

export type Query = {
  __typename: 'Query';
  imageById: Image;
  nonVerifiedImages: Array<Image>;
  users: Array<User>;
  verifiedImages: Array<Image>;
};


export type QueryImageByIdArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename: 'User';
  fullName: Scalars['String'];
  pk: Scalars['String'];
  profile_pic_url: Scalars['String'];
  userName: Scalars['String'];
};

export type GetNonVerifiedImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNonVerifiedImagesQuery = { __typename: 'Query', nonVerifiedImages: Array<{ __typename: 'Image', id: string, fileName: string, imgUrl: string }> };


export const GetNonVerifiedImagesDocument = gql`
    query getNonVerifiedImages {
  nonVerifiedImages {
    id
    fileName
    imgUrl
  }
}
    `;

/**
 * __useGetNonVerifiedImagesQuery__
 *
 * To run a query within a React component, call `useGetNonVerifiedImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNonVerifiedImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNonVerifiedImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNonVerifiedImagesQuery(baseOptions?: Apollo.QueryHookOptions<GetNonVerifiedImagesQuery, GetNonVerifiedImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNonVerifiedImagesQuery, GetNonVerifiedImagesQueryVariables>(GetNonVerifiedImagesDocument, options);
      }
export function useGetNonVerifiedImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNonVerifiedImagesQuery, GetNonVerifiedImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNonVerifiedImagesQuery, GetNonVerifiedImagesQueryVariables>(GetNonVerifiedImagesDocument, options);
        }
export type GetNonVerifiedImagesQueryHookResult = ReturnType<typeof useGetNonVerifiedImagesQuery>;
export type GetNonVerifiedImagesLazyQueryHookResult = ReturnType<typeof useGetNonVerifiedImagesLazyQuery>;
export type GetNonVerifiedImagesQueryResult = Apollo.QueryResult<GetNonVerifiedImagesQuery, GetNonVerifiedImagesQueryVariables>;
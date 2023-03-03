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
  | 'NOT_DUCK'
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
  nonVerifiedImage: Image;
  nonVerifiedImages: Array<Image>;
  stats: Stats;
  users: Array<User>;
  verifiedImages: Array<Image>;
};


export type QueryImageByIdArgs = {
  id: Scalars['ID'];
};

export type Stats = {
  __typename: 'Stats';
  totalImages: Scalars['Int'];
  totalNonVerifiedImages: Scalars['Int'];
  totalUsers: Scalars['Int'];
  totalVerifiedImages: Scalars['Int'];
  verifiedDucks: Scalars['Int'];
  verifiedNotDucks: Scalars['Int'];
};

export type User = {
  __typename: 'User';
  fullName: Scalars['String'];
  pk: Scalars['String'];
  profile_pic_url: Scalars['String'];
  userName: Scalars['String'];
};

export type ImageByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ImageByIdQuery = { __typename: 'Query', imageById: { __typename: 'Image', id: string, fileName: string, imgUrl: string } };

export type GetNonVerifiedImageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNonVerifiedImageQuery = { __typename: 'Query', nonVerifiedImage: { __typename: 'Image', id: string, fileName: string, imgUrl: string } };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename: 'Query', stats: { __typename: 'Stats', totalImages: number, totalVerifiedImages: number, verifiedDucks: number, verifiedNotDucks: number } };

export type UnVerifyImageMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnVerifyImageMutation = { __typename: 'Mutation', undoVerifyImage: { __typename: 'Image', id: string, fileName: string, imgUrl: string } };

export type VerifyImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageType: ImageType;
}>;


export type VerifyImageMutation = { __typename: 'Mutation', verifyImage: { __typename: 'Image', id: string } };


export const ImageByIdDocument = gql`
    query imageById($id: ID!) {
  imageById(id: $id) {
    id
    fileName
    imgUrl
  }
}
    `;

/**
 * __useImageByIdQuery__
 *
 * To run a query within a React component, call `useImageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageByIdQuery(baseOptions: Apollo.QueryHookOptions<ImageByIdQuery, ImageByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageByIdQuery, ImageByIdQueryVariables>(ImageByIdDocument, options);
      }
export function useImageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageByIdQuery, ImageByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageByIdQuery, ImageByIdQueryVariables>(ImageByIdDocument, options);
        }
export type ImageByIdQueryHookResult = ReturnType<typeof useImageByIdQuery>;
export type ImageByIdLazyQueryHookResult = ReturnType<typeof useImageByIdLazyQuery>;
export type ImageByIdQueryResult = Apollo.QueryResult<ImageByIdQuery, ImageByIdQueryVariables>;
export const GetNonVerifiedImageDocument = gql`
    query getNonVerifiedImage {
  nonVerifiedImage {
    id
    fileName
    imgUrl
  }
}
    `;

/**
 * __useGetNonVerifiedImageQuery__
 *
 * To run a query within a React component, call `useGetNonVerifiedImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNonVerifiedImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNonVerifiedImageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNonVerifiedImageQuery(baseOptions?: Apollo.QueryHookOptions<GetNonVerifiedImageQuery, GetNonVerifiedImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNonVerifiedImageQuery, GetNonVerifiedImageQueryVariables>(GetNonVerifiedImageDocument, options);
      }
export function useGetNonVerifiedImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNonVerifiedImageQuery, GetNonVerifiedImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNonVerifiedImageQuery, GetNonVerifiedImageQueryVariables>(GetNonVerifiedImageDocument, options);
        }
export type GetNonVerifiedImageQueryHookResult = ReturnType<typeof useGetNonVerifiedImageQuery>;
export type GetNonVerifiedImageLazyQueryHookResult = ReturnType<typeof useGetNonVerifiedImageLazyQuery>;
export type GetNonVerifiedImageQueryResult = Apollo.QueryResult<GetNonVerifiedImageQuery, GetNonVerifiedImageQueryVariables>;
export const StatsDocument = gql`
    query stats {
  stats {
    totalImages
    totalVerifiedImages
    verifiedDucks
    verifiedNotDucks
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const UnVerifyImageDocument = gql`
    mutation unVerifyImage($id: ID!) {
  undoVerifyImage(id: $id) {
    id
    fileName
    imgUrl
  }
}
    `;
export type UnVerifyImageMutationFn = Apollo.MutationFunction<UnVerifyImageMutation, UnVerifyImageMutationVariables>;

/**
 * __useUnVerifyImageMutation__
 *
 * To run a mutation, you first call `useUnVerifyImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnVerifyImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unVerifyImageMutation, { data, loading, error }] = useUnVerifyImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnVerifyImageMutation(baseOptions?: Apollo.MutationHookOptions<UnVerifyImageMutation, UnVerifyImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnVerifyImageMutation, UnVerifyImageMutationVariables>(UnVerifyImageDocument, options);
      }
export type UnVerifyImageMutationHookResult = ReturnType<typeof useUnVerifyImageMutation>;
export type UnVerifyImageMutationResult = Apollo.MutationResult<UnVerifyImageMutation>;
export type UnVerifyImageMutationOptions = Apollo.BaseMutationOptions<UnVerifyImageMutation, UnVerifyImageMutationVariables>;
export const VerifyImageDocument = gql`
    mutation verifyImage($id: ID!, $imageType: ImageType!) {
  verifyImage(id: $id, imageType: $imageType) {
    id
  }
}
    `;
export type VerifyImageMutationFn = Apollo.MutationFunction<VerifyImageMutation, VerifyImageMutationVariables>;

/**
 * __useVerifyImageMutation__
 *
 * To run a mutation, you first call `useVerifyImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyImageMutation, { data, loading, error }] = useVerifyImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      imageType: // value for 'imageType'
 *   },
 * });
 */
export function useVerifyImageMutation(baseOptions?: Apollo.MutationHookOptions<VerifyImageMutation, VerifyImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyImageMutation, VerifyImageMutationVariables>(VerifyImageDocument, options);
      }
export type VerifyImageMutationHookResult = ReturnType<typeof useVerifyImageMutation>;
export type VerifyImageMutationResult = Apollo.MutationResult<VerifyImageMutation>;
export type VerifyImageMutationOptions = Apollo.BaseMutationOptions<VerifyImageMutation, VerifyImageMutationVariables>;
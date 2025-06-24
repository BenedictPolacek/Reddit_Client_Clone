import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface PostData {
  data: {
    author: string,
    title: string,
    selftext: string,
    created: number,
    url: string,
    thumbnail: string,
    is_video: boolean,
    media?: {
      reddit_video: {
        fallback_url: string
      }
    }
  }
}
export interface RedditApiResponse {
  after: string | null;
  children: PostData[] 
}
export function makeRedditEndpoint({topic, after, searchTerm}: {topic: string,  after: string | null, searchTerm?: string}){
  if(searchTerm && topic === 'search'){
    return `search/.json?q=${searchTerm}&limit=6&after=${after}`;
  }
  return `r/${topic}.json?limit=10&after=${after}`;
}
export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (build) => ({
    getRedditData: build.query<RedditApiResponse, {topic: string,  after: string | null, searchTerm?: string}>({
      query: makeRedditEndpoint,
      transformResponse: (response: { data: RedditApiResponse}) => {
        return response.data;
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}/${queryArgs.topic}/${queryArgs.searchTerm || ''}`;
      },
      merge: (currentCache, newItems) => {
        currentCache.after = newItems.after;
        currentCache.children.push(...newItems.children)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.after !== previousArg?.after || currentArg?.searchTerm !== previousArg?.searchTerm || currentArg?.topic !== previousArg?.topic
      },
    }),
  }),
});

export const { useLazyGetRedditDataQuery  } = redditApi;
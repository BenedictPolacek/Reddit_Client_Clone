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
  after: string;
  children: PostData[] 
}

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (build) => ({
    getRedditData: build.query<RedditApiResponse, {topic: string, searchTerm?: string, after?: string}>({
      query: ({topic, searchTerm, after}) => {    
        if(searchTerm && topic === 'search'){
          return `search/.json?q=${searchTerm}&limit=6&after=${after}`
        }
        return `r/${topic}.json?limit=10&after=${after}`;
      },
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

export const { useGetRedditDataQuery, useLazyGetRedditDataQuery } = redditApi;
import { configureStore } from '@reduxjs/toolkit'
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

const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (build) => ({
    getRedditData: build.query<RedditApiResponse, {topic: string, after?: string}>({
      query: ({topic, after}) => `r/${topic}.json?limit=20&after=${after}`,
      transformResponse: (response: { data: RedditApiResponse}) => {
        return response.data;
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}/${queryArgs.topic}`;
      },
      merge: (currentCache, newItems) => {
        currentCache.after = newItems.after;
        currentCache.children.push(...newItems.children)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.after !== previousArg?.after
      },
    }),
  }),
})

export const makeStore = () => configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware),
  }
)
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const { useGetRedditDataQuery } = redditApi
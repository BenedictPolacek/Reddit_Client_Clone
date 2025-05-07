import { configureStore } from '@reduxjs/toolkit'
import { redditApi } from './api';

export const makeStore = () => configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware),
  }
)

export type AppStore = ReturnType<typeof makeStore>
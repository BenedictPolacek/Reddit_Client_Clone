'use client'
import { useLazyGetRedditDataQuery } from "@/lib/api";
import { useEffect, useRef, useState } from "react";

export default function useGetData(topicEndpoint: string, searchTerm: string | undefined, inViews: boolean[]) {
  const [trigger, { data, isFetching, isError, error, isUninitialized }] = useLazyGetRedditDataQuery();
  const prevSearchTerm = useRef<string | undefined>(undefined)
  const prevInViewState = useRef<boolean>(false);
  const [ isInitialLoading, setIsInitialLoading ] = useState<boolean>(true)

  useEffect(() => {
    if(isUninitialized || prevSearchTerm.current !== searchTerm){
      setIsInitialLoading(true)
      trigger({ topic: topicEndpoint, after: null, searchTerm: searchTerm }).finally(() => setIsInitialLoading(false));;
      prevSearchTerm.current = searchTerm;
    }
    if(inViews.some(Boolean) && !isFetching && data?.after && !prevInViewState.current){
      trigger({ topic: topicEndpoint, searchTerm: searchTerm, after: data?.after})
    }
    if(inViews.some(Boolean) !== prevInViewState.current) prevInViewState.current = inViews.some(Boolean)
  },[inViews, searchTerm, data?.after, isFetching, isUninitialized, topicEndpoint, trigger])

  if (isError) throw Error('Failed to fetch data.', {cause: error});
  if (data?.children.length === 0) throw Error('No posts returned.');
  return { data: data?.children, initialFetch: isInitialLoading, isFetching, isUninitialized }
}
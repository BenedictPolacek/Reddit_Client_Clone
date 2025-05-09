'use client'
import { useLazyGetRedditDataQuery } from "@/lib/api";
import { useEffect, useRef } from "react";

export default function useGetData(topicEndpoint: string, searchTerm: string | undefined, inViews: boolean[]) {
  const [trigger, { data, isFetching, isError, error, isLoading, isUninitialized }] = useLazyGetRedditDataQuery();
  const prevSearchTerm = useRef<string | undefined>(undefined)
  
  useEffect(() => {
    if(isUninitialized || prevSearchTerm.current !== searchTerm){
      trigger({ topic: topicEndpoint, searchTerm: searchTerm });
      prevSearchTerm.current = searchTerm;
    }
    if(inViews.some(Boolean) && !isFetching && data?.after){
      trigger({ topic: topicEndpoint, searchTerm: searchTerm, after: data?.after})
    }
  },[inViews, searchTerm])

  if (isError) throw Error('Failed to fetch data.', {cause: error});
  if (data?.children.length === 0) throw Error('No posts returned.');
  return { data: data?.children, initialFetch: isLoading, isFetching, isUninitialized }
}
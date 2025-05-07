'use client'
import { useLazyGetRedditDataQuery } from "@/lib/api";
import { useEffect } from "react";
import { InViewHookResponse } from "react-intersection-observer";

export default function useGetData(topicEndpoint: string, searchTerm: string | undefined, views: InViewHookResponse[]) {
    const [trigger, { data, isFetching, isError, error, isLoading, isUninitialized }] = useLazyGetRedditDataQuery();    
    useEffect(() => {
      trigger({ topic: topicEndpoint, searchTerm: searchTerm });
    }, [searchTerm])

    const inViews = views.map((view) => {
        return view[1];
    })
    const viewRefs = views.map((view) => {
        return view[0];
    })
    
    useEffect(() => {
      inViews.forEach((inView) => {
        if(inView && !isFetching && data?.after){
          trigger({ topic: topicEndpoint, searchTerm: searchTerm, after: data?.after})
        }
      })
    },[...inViews, isFetching, data?.after])

    if (isError) throw Error('Failed to fetch data.', {cause: error});
    if (data?.children.length === 0) throw Error('No posts returned.');
    return { data: data?.children, initialFetch: isLoading, isFetching, isUninitialized, viewRefs }
}
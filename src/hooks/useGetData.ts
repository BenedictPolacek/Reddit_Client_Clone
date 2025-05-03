'use client'
import { useLazyGetRedditDataQuery } from "@/app/store";
import { useEffect } from "react";
import { InViewHookResponse } from "react-intersection-observer";


export default function fetchData(topicEndpoint: string, views: InViewHookResponse[]) {
    const [trigger, { data, isFetching, isError, isLoading, isUninitialized }] = useLazyGetRedditDataQuery();    
    useEffect(() => {
      trigger({ topic: topicEndpoint });
    }, [])

    const inViews = views.map((view) => {
        return view[1];
    })
    const viewRefs = views.map((view) => {
        return view[0];
    })
    useEffect(() => {
      inViews.forEach((inView) => {
        if(inView && !isFetching && data?.after){
          trigger({ topic: topicEndpoint, after: data?.after})
        }
      })
    },[...inViews, isFetching, data?.after])

    return { data: data?.children, initialFetch: isLoading, isFetching, isUninitialized, isError, viewRefs }
}
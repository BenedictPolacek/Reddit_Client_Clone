'use client'
import PostLayout from "@/components/posts/PostLayout";
import { use } from "react";
import { searchForEndpoint } from "@/utils/topicUtils";
import { useMultipleInViews } from "@/hooks/useMultipleInViews";
import useGetData from "@/hooks/useGetData";
import LoadingLayout from "@/components/loading/LoadingLayout";


export default function Home({params}:{ params: Promise<{ topic: string }>} ) {
  const { topic } = use(params);
  const topicEndpoint = searchForEndpoint(decodeURIComponent(topic))
  if(!topicEndpoint) throw Error('Undefined Topic');
  const inViews = useMultipleInViews(2);
  const { data, initialFetch, isFetching, isUninitialized, isError, viewRefs } = useGetData(topicEndpoint, inViews)
  if (initialFetch) return <LoadingLayout/>
  if (isError) throw Error('Failed to fetch data.');
  if (isUninitialized) return <LoadingLayout/> 
  if (!data) return Error('No data returned.');
  return <PostLayout Posts={data} viewRefs={!isFetching ? viewRefs : undefined} isFetching={isFetching}/>
}


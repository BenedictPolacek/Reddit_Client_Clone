'use client'
import PostLayout from "@/components/posts/PostLayout";
import LoadingLayout from "@/components/loading/LoadingLayout";
import { use } from "react";
import { searchForEndpoint } from "@/utils/topicUtils";
import { useMultipleInViews } from "@/hooks/useMultipleInViews";
import useGetData from "@/hooks/useGetData";

type Params = Promise<{ topic: string }>
type SearchParams = Promise<{ [term: string]: string | undefined }>

export default function Home({params, searchParams}:{params: Params, searchParams: SearchParams}) {
  const { topic } = use(params);
  const { term: searchTerm } = use(searchParams)
  const topicEndpoint = searchForEndpoint(decodeURIComponent(topic));
  const inViews = useMultipleInViews(2);
  
  const { data, initialFetch, isFetching, isUninitialized, viewRefs } = useGetData(topicEndpoint, searchTerm, inViews);

  if (initialFetch || isUninitialized) return <LoadingLayout/>
  if (!data) throw Error('No data returned');
  return <PostLayout Posts={data} viewRefs={viewRefs} isFetching={isFetching}/>
}


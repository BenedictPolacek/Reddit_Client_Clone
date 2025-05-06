'use client'
import PostLayout from "@/components/posts/PostLayout";
import { use } from "react";
import { searchForEndpoint } from "@/utils/topicUtils";
import { useMultipleInViews } from "@/hooks/useMultipleInViews";
import useGetData from "@/hooks/useGetData";
import LoadingLayout from "@/components/loading/LoadingLayout";


export default function Home({params}:{ params: Promise<{ topic: string }>} ) {
  const { topic } = use(params);
  const topicEndpoint = searchForEndpoint(decodeURIComponent(topic));
  const inViews = useMultipleInViews(2);
  const { data, initialFetch, isFetching, isUninitialized, viewRefs } = useGetData(topicEndpoint, inViews);

  if (initialFetch || isUninitialized) return <LoadingLayout/>
  if (!data) throw Error('No data returned');
  return <PostLayout Posts={data} viewRefs={viewRefs} isFetching={isFetching}/>
}


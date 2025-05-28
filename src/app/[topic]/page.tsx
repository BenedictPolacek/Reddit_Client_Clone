'use client'
import PostLayout from "@/components/posts/PostLayout";
import LoadingLayout from "@/components/loading/LoadingLayout";
import { use } from "react";
import { humanizePath, searchForEndpoint } from "@/utils/topicUtils";
import useGetData from "@/hooks/useGetData";
import { useInViewState } from "@/hooks/useInViewStates";
import Post from "@/components/posts/Post";

type Params = Promise<{ topic: string }>
type SearchParams = Promise<{ [term: string]: string | undefined }>

export default function Home({params, searchParams}:{params: Params, searchParams: SearchParams}) {
  const { topic } = use(params);
  const { term: searchTerm } = use(searchParams);
  const topicEndpoint = searchForEndpoint(decodeURIComponent(topic))
  const { inViews, inViewHandler, inViewCount} = useInViewState(2)
  const { data, initialFetch, isFetching, isUninitialized } = useGetData(topicEndpoint, searchTerm ? humanizePath(searchTerm): undefined, inViews);
  
  if (initialFetch || isUninitialized) return <LoadingLayout/>
  if (!data) throw Error('No data returned');

  const PostUIArray = data.map(({data: postData}, index) => {
    const isLast = data.length - index <= inViewCount;
    const postProps = {
      author: postData.author,
      title: postData.title,
      text: postData.selftext,
      createdAt: postData.created,
      videoUrl: postData.is_video ? postData.media?.reddit_video.fallback_url : undefined,
      pictureUrl: postData.url,
      thumbnailUrl: postData.thumbnail,
      isLast: isLast,
      inViewHandler: (isLast && !isFetching) ? inViewHandler(data.length - index - 1) : undefined
    };
    return <Post {...postProps} key={`post-${index}`}/>
  });
  return <PostLayout data={PostUIArray} isFetching={isFetching}/>
}


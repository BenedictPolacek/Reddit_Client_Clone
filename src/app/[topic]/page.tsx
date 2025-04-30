'use client'
import PostLayout from "@/components/posts/PostLayout";
import { useLazyGetRedditDataQuery } from "../store";
import { use, useEffect} from "react";
import { searchForEndpoint } from "@/utils/topicUtils";
import { useInView } from "react-intersection-observer";


export default function Home({params}:{ params: Promise<{ topic: string }>} ) {
  const { topic } = use(params);
  const topicEndpoint = searchForEndpoint(decodeURIComponent(topic))
  if(!topicEndpoint) throw Error('');

  const [trigger, { data, isFetching, isError }] = useLazyGetRedditDataQuery();
  useEffect(() => {
    trigger({ topic: topicEndpoint });
  }, []);
  const PostArray = data?.children ?? []

  const { ref, inView } = useInView({
    threshold: 1.0,
  });
  useEffect(() => {
    if(inView && !isFetching && data?.after){
      trigger({ topic: topicEndpoint, after: data?.after})
    }
  },[inView, isFetching, data?.after])

  if (isError) throw Error('Failed to fetch data.');
  if (!data && isFetching) return <div>Loading...</div>;
  return (
    <>
      <PostLayout Posts={PostArray} lastPostRef={!isFetching ? ref : undefined}/>
    </>
    
  );
}

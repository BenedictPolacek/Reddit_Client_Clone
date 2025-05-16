import PostHeader from "./postBody/PostHeader";
import PostTitle from "./postBody/PostTitle";
import PostText from "./postBody/PostText";
import { Card } from "flowbite-react";
import { getTimeAgo, isPictureFormat } from "@/utils/postUtils";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function Post({author, title, text, createdAt, pictureUrl, thumbnailUrl, videoUrl, isLast, inViewHandler}
    :{author: string, title: string, text?: string, createdAt: number, pictureUrl: string, thumbnailUrl: string, videoUrl?: string, isLast: boolean, inViewHandler: ((inView: boolean) => void) | undefined}) {
  const [ ref, inView] = useInView({ threshold: 1.0, skip: !isLast })
  useEffect(() => {
    if(inViewHandler){
      inViewHandler(inView)
    }
  }, [inView, inViewHandler])

  const postedAgo = getTimeAgo(createdAt);
  const hasVideo = videoUrl ? videoUrl : undefined;
  const hasPicture = isPictureFormat(pictureUrl) && !hasVideo ? pictureUrl : undefined;
  const hasThumbnail = isPictureFormat(thumbnailUrl) && !hasPicture && !hasVideo ? thumbnailUrl : undefined;
  return (
    <Card className='max-w-180 mb-6 w-full'>
      <PostHeader 
        author={author} 
        postedAgo={postedAgo} 
        videoUrl={hasVideo} 
        pictureUrl={hasPicture}
      />
      <PostTitle 
        title={title} 
        thumbnailUrl={hasThumbnail} 
        lastRef={ref}
      />
      <PostText 
        text={text}
      />
    </Card>
  )
}

export default Post;
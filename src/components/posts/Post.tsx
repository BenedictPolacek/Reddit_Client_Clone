import PostHeader from "./postBody/PostHeader";
import PostTitle from "./postBody/PostTitle";
import PostText from "./postBody/PostText";
import { Card } from "flowbite-react";
import { getTimeAgo, isPictureFormat } from "@/utils/postUtils";
import { ViewRef } from "@/hooks/useMultipleInViews";

function Post({author, title, text, createdAt, pictureUrl, thumbnailUrl, videoUrl, lastRef}
    :{author: string, title: string, text?: string, createdAt: number, pictureUrl: string, thumbnailUrl: string, videoUrl?: string, lastRef?: ViewRef}) {
  const postedAgo = getTimeAgo(createdAt);
  const hasVideo = videoUrl ? videoUrl : undefined;
  const hasPicture = isPictureFormat(pictureUrl) && !hasVideo ? pictureUrl : undefined;
  const hasThumbnail = isPictureFormat(thumbnailUrl) && !hasPicture && !hasVideo ? thumbnailUrl : undefined;
    return (
    <Card className='m-8 w-70 xs:w-85 sm:w-130 md:w-170 lg:w-105 xl:w-140 2xl:w-180'>
        <PostHeader 
          author={author} 
          postedAgo={postedAgo} 
          videoUrl={hasVideo} 
          pictureUrl={hasPicture}
        />
        <PostTitle 
          title={title} 
          thumbnailUrl={hasThumbnail} 
          lastRef={lastRef}
        />
        <PostText 
          text={text}
        />
    </Card>
  )
}

export default Post;
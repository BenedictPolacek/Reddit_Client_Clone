import { Card } from "flowbite-react";
import PostHeader from "./postBody/PostHeader";
import PostTitle from "./postBody/PostTitle";
import PostText from "./postBody/PostText";
import { getTimeAgo, isPictureFormat } from "@/utils/postUtils";
import React from "react";

function Post({author, title, text, createdAt, pictureUrl, thumbnailUrl, videoUrl, lastPostRef}
    :{author: string, title: string, text?: string, createdAt: number, pictureUrl: string, thumbnailUrl: string, videoUrl?: string, lastPostRef?: (node?: Element | null) => void}) {
  const postedAgo = getTimeAgo(createdAt);
  const hasVideo = videoUrl ? videoUrl : undefined;
  const hasPicture = isPictureFormat(pictureUrl) && !hasVideo ? pictureUrl : undefined;
  const hasThumbnail = isPictureFormat(thumbnailUrl) && !hasPicture && !hasVideo ? thumbnailUrl : undefined;
  return (
    <Card className="max-w-150 m-8">
        <PostHeader 
          author={author} 
          postedAgo={postedAgo} 
          videoUrl={hasVideo} 
          pictureUrl={hasPicture}
        />
        <PostTitle 
          title={title} 
          thumbnailUrl={hasThumbnail} 
          lastPostRef={lastPostRef}
        />
        <PostText 
          text={text}
        />
    </Card>
  )
}

export default Post;
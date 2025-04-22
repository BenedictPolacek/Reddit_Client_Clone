import { Card } from "flowbite-react";
import PostHeader from "./postBody/PostHeader";
import PostTitle from "./postBody/PostTitle";
import PostText from "./postBody/PostText";
import { getTimeAgo } from "@/utils/postUtils";

export default function Post({author, createdAt, title, text, videoUrl, pictureUrl, thumbnailUrl}
    :{author: string, createdAt: number, title: string, text?: string, videoUrl?: string, pictureUrl?: string, thumbnailUrl?: string}) {
    const postedAgo = getTimeAgo(createdAt);
  return (
    <Card className="max-w-140 m-8">
        <PostHeader author={author} postedAgo={postedAgo} videoUrl={videoUrl} pictureUrl={pictureUrl}/>
        <PostTitle title={title} thumbnailUrl={thumbnailUrl}/>
        <PostText text={text}/>
    </Card>
  )
}

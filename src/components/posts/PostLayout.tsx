import { getHalf, isPictureFormat } from "@/utils/postUtils"
import { v4 as uuidv4 } from 'uuid';
import type { PostData } from "@/app/store";
import Post from "./Post";

export default function postLayout({Posts}: { Posts:PostData[]}) {
  const PostUIArray = Posts.map(({data}) => {
    const baseProps = {
        author: data.author,
        title: data.title,
        text: data.selftext,
        createdAt: data.created,
    };
    const isVideo = data.is_video;
    const isPicture = isPictureFormat(data.url);
    const isThumbnail = isPictureFormat(data.thumbnail)
    if(isVideo) return <Post {...baseProps} videoUrl={data.media?.reddit_video.fallback_url} key={uuidv4()}/>
    if(isPicture) return <Post {...baseProps} pictureUrl={data.url} key={uuidv4()}/>
    if(isThumbnail) return <Post {...baseProps} thumbnailUrl={data.thumbnail} key={uuidv4()}/>
    return <Post {...baseProps} key={uuidv4()}/>
  })

  return (
    <>
      <div className=" justify-center hidden lg:flex lg:mr-10 lg:ml-10 xl:mr-20 xl:ml-20 laptop:mr-30 laptop:ml-30">
        <div className="">
          {getHalf(PostUIArray, 1)}
        </div>
        <div className="">
          {getHalf(PostUIArray, 2)}
        </div>
      </div>
      <div>
        <div className="flex justify-center flex-col items-center lg:hidden xs:mr-5 xs:ml-5 sm:mr-20 sm:ml-20 md:mr-40 md:ml-40">
          {PostUIArray}
        </div>
      </div>
    </>
  )
}

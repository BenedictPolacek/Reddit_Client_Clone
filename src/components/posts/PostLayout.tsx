import { getHalf } from "@/utils/postUtils"
import type { PostData } from "@/app/store";
import Post from "./Post";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function postLayout({Posts, lastPostRef}: { Posts:PostData[], lastPostRef?: (node?: Element | null) => void}) {
  const PostUIArray = Posts.map(({data}, index) => {
    const isLast = index === Posts.length - 1;
    const postData = {
      author: data.author,
      title: data.title,
      text: data.selftext,
      createdAt: data.created,
      videoUrl: data.is_video ? data.media?.reddit_video.fallback_url : undefined,
      pictureUrl: data.url,
      thumbnailUrl: data.thumbnail
    };
    return <Post {...postData} key={`post-${index}`} lastPostRef={isLast ? lastPostRef : undefined}/>
  });
  const windowWidth = useWindowWidth()
  return (
    <>
      {windowWidth >= 1024 ?
        <div className="justify-center hidden lg:flex lg:mr-10 lg:ml-10 xl:mr-20 xl:ml-20 laptop:mr-30 laptop:ml-30">
          <div>
            {getHalf(PostUIArray, 1)}
          </div>
          <div>
            {getHalf(PostUIArray, 2)}
          </div>
        </div>
        :
        <div>
          <div className="flex justify-center flex-col items-center lg:hidden xs:mr-5 xs:ml-5 sm:mr-20 sm:ml-20 md:mr-40 md:ml-40">
            {PostUIArray}
          </div>
        </div>
      }
    </>
  )
}

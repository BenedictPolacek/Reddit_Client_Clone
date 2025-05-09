import Post from "./Post";
import Skeleton from "../loading/Skeleton";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getHalf } from "@/utils/postUtils"
import { PostData } from "@/lib/api";

export default function PostLayout({Posts, isFetching, inViewHandler, inViewCount}: { Posts:PostData[], inViewHandler: (index: number) => (inView: boolean) => void, isFetching: boolean, inViewCount: number}) {
  const windowWidth = useWindowWidth()

  const PostUIArray = Posts.map(({data}, index) => {
    const isLast = Posts.length - index <= inViewCount;
    const postData = {
      author: data.author,
      title: data.title,
      text: data.selftext,
      createdAt: data.created,
      videoUrl: data.is_video ? data.media?.reddit_video.fallback_url : undefined,
      pictureUrl: data.url,
      thumbnailUrl: data.thumbnail,
    };
    return <Post {...postData} key={`post-${index}`} isLast={isLast} inViewHandler={isLast && !isFetching ? inViewHandler(Posts.length - index - 1) : undefined}/>
  });
  const FirstHalf = getHalf(PostUIArray, 1)
  const SecondHalf = getHalf(PostUIArray, 2)

  return (
    <>
      {windowWidth >= 1024 ?
        <div className="justify-center hidden lg:flex lg:mr-10 lg:ml-10 xl:mr-20 xl:ml-20 laptop:mr-30 laptop:ml-30">
          <div className="flex-col justify-items-end">
            {FirstHalf}
            {isFetching ? <Skeleton/> : null}
          </div>
          <div className="flex-col justify-items-start">
            {SecondHalf}
            {isFetching ? <Skeleton/> : null}
          </div>
        </div>
        :
        <div>
          <div className="flex justify-center flex-col items-center lg:hidden xs:mr-5 xs:ml-5 sm:mr-20 sm:ml-20 md:mr-40 md:ml-40">
            {PostUIArray}
            {isFetching ? <Skeleton/> : null}
          </div>
        </div>
      }
    </>
  )
}

import { LoadingPicture } from '@/components/loading/Skeleton'
import { HiOutlineClock, HiUserCircle } from 'react-icons/hi'

export interface PostHeaderProps{
  author: string, 
  postedAgo: string, 
  videoUrl?: string, 
  pictureUrl?: string
}

export default function PostHeader({author, postedAgo, videoUrl, pictureUrl}: PostHeaderProps) {
  return(
    <div className='flex-col justify-items-center'>
      <div className="w-full flex justify-between mb-2 text-base">
        <div className="flex">
          <HiUserCircle className="h-full mr-1 text-neutral-400"/>
          <p className="text-neutral-400">{author}</p>
        </div>
        <div className="flex">
          <HiOutlineClock className="text-neutral-500 h-full ml-1 mr-1"/>
          <p className="text-neutral-500">{postedAgo}</p>
        </div> 
      </div>
      { 
        videoUrl && (
          <video className="rounded-md h-auto w-full mt-3" controls data-testid='video-player'>
            <source src={videoUrl}/>
            <LoadingPicture data-testid='invalid url'/>
          </video>
        )
      }
      {
        pictureUrl && (<picture><img src={pictureUrl} alt='Post picture' className="rounded-md h-auto w-full object-cover mt-3"/></picture>)
      }     
    </div>
  )
}

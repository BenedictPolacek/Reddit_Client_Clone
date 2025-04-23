import { HiOutlineClock, HiUserCircle } from 'react-icons/hi'

export default function PostHeader({author, postedAgo, videoUrl, pictureUrl}
  : {author: string, postedAgo: string, videoUrl?: string, pictureUrl?: string}) {

  return (
    <div>
        <div className="flex justify-between mb-1 text-base">
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
          videoUrl ? 
            <video className="w-full rounded-md" controls>
              <source src={videoUrl}/>
              Your browser does not support the video tag.
            </video> 
          : <></>
        }
        {
          pictureUrl ? 
            <img src={pictureUrl} className="rounded-md"/>
          : <></>
        }
        
    </div>
  )
}

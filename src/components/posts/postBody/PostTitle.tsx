import { ViewRef } from "@/hooks/useMultipleInViews";

export default function PostTitle({title, thumbnailUrl, lastRef}:{title: string, thumbnailUrl?: string, lastRef?: ViewRef}) {
  return (
    <div ref={lastRef} >
      {
        thumbnailUrl 
        ? <img src={thumbnailUrl} className="float-right rounded-md m-1"/>
        : <></>
      }
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden">
        {title}
      </h5>
    </div>
  )
}

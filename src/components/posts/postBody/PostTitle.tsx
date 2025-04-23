
export default function PostTitle({title, thumbnailUrl}:{title: string, thumbnailUrl?: string}) {
  return (
    <div>
      {
        thumbnailUrl ?
          <img src={thumbnailUrl} className="float-right rounded-md m-1"/>
        : <></>
      }
        
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
    </div>
  )
}

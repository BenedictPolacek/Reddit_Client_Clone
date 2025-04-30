export default function PostTitle({title, thumbnailUrl, lastPostRef}:{title: string, thumbnailUrl?: string, lastPostRef?:(node?: Element | null) => void}) {
  return (
    <div ref={lastPostRef} >
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

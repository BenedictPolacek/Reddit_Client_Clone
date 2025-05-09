
export default function PostTitle({title, thumbnailUrl, lastRef}:{title: string, thumbnailUrl?: string, lastRef?: (node?: Element | null) => void}) {
  return (
    <div ref={lastRef} className="overflow-hidden">
      {
        thumbnailUrl 
        ? <picture><img src={thumbnailUrl} alt='Post thumbnail' className="float-right rounded-md m-1"/></picture>
        : <></>
      }
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
        {title}
      </h5>
    </div>
  )
}

export interface PostTitleProps{
  title: string, 
  thumbnailUrl?: string, 
  lastRef?: (node?: Element | null) => void
}

export default function PostTitle({title, thumbnailUrl, lastRef}: PostTitleProps) {
  return (
    <div ref={lastRef} className="overflow-hidden" data-testid='title-elem'>
      {
        thumbnailUrl && <picture><img src={thumbnailUrl} alt='Post thumbnail' className="float-right rounded-md m-1"/></picture>
      }
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words" style={{ wordBreak: 'break-word' }}>
        {title}
      </h5>
    </div>
  )
}

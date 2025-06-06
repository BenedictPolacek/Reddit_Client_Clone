export interface PostTextProps{
  text?: string
}
export default function PostText({text}: PostTextProps) {
  return (
    text && <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden break-words" style={{ wordBreak: 'break-word' }}>{text}</p>
  )
}

export default function PostText({text}: {text?: string}) {
    return text ? <p className="font-normal text-gray-700 dark:text-gray-400">{text}</p> : <></>
}

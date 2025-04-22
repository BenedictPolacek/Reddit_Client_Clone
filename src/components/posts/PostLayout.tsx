import { getHalf } from "@/utils/postUtils"

export default function postLayout({Posts}: { Posts:React.ReactElement[]}) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-140">
        {getHalf(Posts, 1)}
      </div>
      <div className="w-140">
        {getHalf(Posts, 2)}
      </div>
    </div>
  )
}

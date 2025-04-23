import { getHalf } from "@/utils/postUtils"

export default function postLayout({Posts}: { Posts:React.ReactElement[]}) {
  return (
    <>
      <div className=" justify-center hidden lg:flex lg:mr-10 lg:ml-10 xl:mr-20 xl:ml-20 laptop:mr-30 laptop:ml-30">
        <div className="">
          {getHalf(Posts, 1)}
        </div>
        <div className="">
          {getHalf(Posts, 2)}
        </div>
      </div>
      <div>
        <div className="flex justify-center flex-col items-center lg:hidden xs:mr-5 xs:ml-5 sm:mr-20 sm:ml-20 md:mr-40 md:ml-40">
          {Posts}
        </div>
      </div>
    </>
  )
}

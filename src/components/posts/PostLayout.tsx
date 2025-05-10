import Skeleton from "../loading/Skeleton";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getHalf } from "@/utils/postUtils"
import { JSX } from "react";

export default function PostLayout({data, isFetching}: { data: JSX.Element[] | null, isFetching: boolean}) {
  const windowWidth = useWindowWidth()
  const FirstHalf = data ? getHalf(data, 1):null
  const SecondHalf = data ? getHalf(data, 2):null
  const lg = 1024;
  return (
    <>
      <div className="hidden lg:flex justify-center">
        <div className="flex-col justify-items-end basis-2/5 grow-0 m-4">
          {data && windowWidth >= lg ? FirstHalf : null}
          {isFetching ? <Skeleton/> : null}
        </div>
        <div className="flex-col justify-items-start basis-2/5 grow-0 m-4">
          {data && windowWidth >= lg ? SecondHalf : null}
          {isFetching ? <Skeleton/> : null}
        </div>
      </div>
      <div className="flex lg:hidden justify-center">
        <div className="flex flex-col basis-4/5 grow-0 items-center">
          {data && windowWidth < lg ? data : null}
          {isFetching ? <Skeleton/> : null}
        </div>
      </div>
    </>
  )
}

import Skeleton from "../loading/Skeleton";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getHalf } from "@/utils/postUtils"
import { JSX } from "react";

export type PostLayout = {
  data: JSX.Element[] | null, 
  isFetching: boolean,
} & React.HTMLAttributes<HTMLDivElement>;

export default function PostLayout({data, isFetching}: PostLayout) {
  const windowWidth = useWindowWidth()
  const FirstHalf = data !== null ? getHalf(data, 1) : null
  const SecondHalf = data !== null ? getHalf(data, 2) : null
  const lg = 1024;
  return (
    <>
      <div className="hidden lg:flex justify-center w-full">
        <div className="flex-col justify-items-end basis-2/5 grow-0 m-4 overflow-hidden" data-testid='splitted-data'>
          {data && windowWidth >= lg ? FirstHalf : null}
          {isFetching && windowWidth >= lg ? <Skeleton data-testid='skeleton'/> : null}
        </div>
        <div className="flex-col justify-items-start basis-2/5 grow-0 m-4 overflow-hidden" data-testid='splitted-data'>
          {data && windowWidth >= lg ? SecondHalf : null}
          {isFetching && windowWidth >= lg ? <Skeleton data-testid='skeleton'/> : null}
        </div>
      </div>
      <div className="flex lg:hidden justify-center">
        <div className="flex flex-col basis-4/5 grow-0 items-center" data-testid='whole-data'>
          {data && windowWidth < lg ? data : null}
          {isFetching && windowWidth < lg ? <Skeleton data-testid='skeleton'/> : null}
        </div>
      </div>
    </>
  )
}

'use client'
import { Button} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import SearchBar from "./navBarRight/SearchBar";
import NavDrawer from "./navBarRight/navDrawer/NavDrawer";
import { usePathname } from 'next/navigation';
import { humanizePath } from "@/utils/topicUtils";

export default function RightNavbarSide({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const pathname = usePathname();
  useEffect(() => {
    handleClose();
  }, [pathname]);

  const topic = humanizePath(pathname.slice(1));
  return (
    <>
      <div className="flex md:order-2 sm:basis-2/3 justify-end">
        <SearchBar formClassName='hidden basis-4/5 sm:block' data-testid='search-bar'/>
        <Button onClick={handleOpen} color="light" className="ml-2 h-12 pl-4 md:h-13" data-testid='topic-button'>
          <HiMenuAlt1 className="h-5 w-5 mr-2"/>
          <div className="font-sans font-normal text-base md:max-w-30 max-w-25 truncate">{topic !== 'search' ? topic : 'Topics' }</div>
        </Button>
      </div>

      <NavDrawer isOpen={isOpen} onHandleClose={handleClose}>
        {children}
      </NavDrawer>
    </>
  )
}





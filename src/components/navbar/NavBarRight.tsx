'use client'
import { Button} from "flowbite-react";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import SearchBar from "./navBarRight/SearchBar";
import NavDrawer from "./navBarRight/navDrawer/NavDrawer";


export default function RightNavbarSide({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <div className="flex md:order-2">
        <SearchBar/>
        <Button onClick={handleOpen} color="light" className="ml-2 h-12 pl-4 sm:h-13">
          <HiMenuAlt1 className="h-5 w-5 mr-2"/>
          <div className="font-sans font-normal text-base">Popular </div>
        </Button>
      </div>

      <NavDrawer isOpen={isOpen} onHandleClose={handleClose}>
        {children}
      </NavDrawer>
    </>
  )
}





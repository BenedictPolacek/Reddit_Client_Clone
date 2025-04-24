import { Navbar } from "flowbite-react"
import LeftNavbarSide from "./NavBarLeft"
import RightNavbarSide from "./NavBarRight"
import DrawerSideBar from "./navBarRight/navDrawer/DrawerSideBar"

export default function NavBar() {
  return (
    <Navbar fluid rounded>
          <LeftNavbarSide/>
          <RightNavbarSide>
            <DrawerSideBar/>
          </RightNavbarSide>
    </Navbar>
  )
}


import { Navbar } from "flowbite-react"
import LeftNavbarSide from "./NavBarLeft"
import RightNavbarSide from "./NavBarRight"
import NavSideBar from "./navBarRight/navDrawer/NavSideBar"

export default function NavBar() {
  return (
    <Navbar fluid rounded>
          <LeftNavbarSide/>
          <RightNavbarSide>
            <NavSideBar/>
          </RightNavbarSide>
    </Navbar>
  )
}


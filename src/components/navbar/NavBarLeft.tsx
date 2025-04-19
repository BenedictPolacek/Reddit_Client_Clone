import { NavbarBrand } from "flowbite-react";


export default function LeftNavbarSide() {
  return (
    <NavbarBrand href="" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 ">
            <span className="hidden text-[19.5px] xs:block">Benedict Polacek</span>
            <span className="block text-[19px] xs:hidden ">BP</span>
    </NavbarBrand>
  )
}

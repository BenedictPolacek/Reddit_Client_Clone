'use client'
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";


export default function SideSearchBar() {
  return (
    <form className="pb-3 md:hidden">
        <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
    </form>
  )
}

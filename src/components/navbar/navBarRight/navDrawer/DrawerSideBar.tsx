import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import TopicItems from "./TopicsItems";
import SearchBar from "../SearchBar";

export default function NavSideBar() {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example" className="[&>div]:bg-transparent [&>div]:p-0">
      <div className="flex h-full flex-col justify-between py-2">
        <SearchBar formClassName="w-64 sm:hidden" buttonClassName='hidden'/>
        <SidebarItems>
          <SidebarItemGroup>
            <TopicItems/>
          </SidebarItemGroup>
        </SidebarItems>     
      </div>
    </Sidebar>
  )
}
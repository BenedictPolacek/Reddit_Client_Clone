import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import SideSearchBar from "./SideSearchBar";
import TopicItems from "./TopicsItems";

export default function NavSideBar() {
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className="[&>div]:bg-transparent [&>div]:p-0">
            <div className="flex h-full flex-col justify-between py-2">
                <SideSearchBar/>
                <SidebarItems>
                  <SidebarItemGroup>
                    <TopicItems/>
                  </SidebarItemGroup>
                </SidebarItems>     
            </div>
        </Sidebar>
  )
}

import { SidebarItem } from "flowbite-react";
import Link from "next/link";


export default function TopicItem({topic}: {topic: string}) {
  return (
    <SidebarItem href="/#" as={Link} className="border-b-3 border-gray-700 rounded-sm opacity-0 animate-fade-in-up ">
        <div className="max-w-48 truncate">{topic}</div>
    </SidebarItem>
  )
}

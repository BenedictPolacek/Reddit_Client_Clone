import { humanizePath } from "@/utils/topicUtils";
import { SidebarItem } from "flowbite-react";
import Link from "next/link";

export default function TopicItem({topic}: {topic: string}) {
  return (
    <SidebarItem href={`/${topic}`} as={Link} className="border-b-3 border-gray-700 rounded-sm opacity-0 animate-fade-in-up ">
      <div className="max-w-48 truncate text-start">{humanizePath(topic)}</div>
    </SidebarItem>
  )
}

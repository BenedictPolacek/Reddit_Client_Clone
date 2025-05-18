import { humanizePath } from "@/utils/topicUtils";
import { SidebarItem } from "flowbite-react";
import Link from "next/link";

export type TopicItemProps = {
  topic: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TopicItem({topic, ...rest }: TopicItemProps) {
  return (
    <SidebarItem href={`/${topic}`} as={Link} className="border-b-3 border-gray-700 rounded-sm opacity-0 animate-fade-in-up" {...rest}>
      <div className="max-w-48 truncate text-start">{humanizePath(topic)}</div>
    </SidebarItem>
  )
}

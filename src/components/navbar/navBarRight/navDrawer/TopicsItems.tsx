import { topics } from "@/data/topics"
import { SidebarCollapse } from "flowbite-react";
import { v4 as uuidv4 } from 'uuid';
import TopicItem from "./TopicItem";

export default function SideBarItems() {
  return (
    <>
      {
        topics.map((topicHead) => {
          if(typeof topicHead === 'object'){
            const [head, topicGroup ] = Object.entries(topicHead)[0];
            return (
              <SidebarCollapse label={head} className="border-b-3 border-white rounded-sm" key={uuidv4()}>
                {topicGroup.map((topic: string) => {
                  return (
                      <TopicItem topic={topic} key={uuidv4()}/>
                  )
                })}
              </SidebarCollapse>
            );
          } else {
            return (
              <TopicItem topic={topicHead} key={uuidv4()}/>
            );
          }
        })
      }
    </>
  )
}

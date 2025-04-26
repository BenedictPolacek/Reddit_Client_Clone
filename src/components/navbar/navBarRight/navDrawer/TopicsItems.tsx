import { TopicHead, TopicObject, topics } from "@/data/topics"
import { SidebarCollapse } from "flowbite-react";
import { v4 as uuidv4 } from 'uuid';
import TopicItem from "./TopicItem";

export default function SideBarItems() {
  return (
    <>
      {
        topics.map((topicHead: TopicHead) => {
          if('name' in topicHead && typeof topicHead.name === 'string'){ 
            return <TopicItem topic={topicHead.name} key={uuidv4()}/>  
          }

          const [head, topicGroup]:[string, TopicObject[]] = Object.entries(topicHead)[0]
          return (
            <SidebarCollapse label={head} className="border-b-3 border-white rounded-sm" key={uuidv4()}>
              {topicGroup.map((topic) => {
                return (
                  <TopicItem topic={topic.name} key={uuidv4()}/>
                )
              })}
            </SidebarCollapse>
          );
        })
      }
    </>
  )
}

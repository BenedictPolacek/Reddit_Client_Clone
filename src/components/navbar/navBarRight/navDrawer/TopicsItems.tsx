import { TopicHead, TopicObject, topics } from "@/data/topics"
import { SidebarCollapse } from "flowbite-react";
import TopicItem from "./TopicItem";

export default function SideBarItems() {
  return (
    <>
      {
        topics.map((topicHead: TopicHead, index1) => {
          if('name' in topicHead && typeof topicHead.name === 'string'){ 
            return <TopicItem topic={topicHead.name} key={`topic-${index1}`}/>  
          }

          const [head, topicGroup]:[string, TopicObject[]] = Object.entries(topicHead)[0]
          return (
            <SidebarCollapse label={head} className="border-b-3 border-white rounded-sm" key={`topic-group-${index1}`}>
              {topicGroup.map((topic, index2) => {
                return (
                  <TopicItem topic={topic.name} key={`topic-${index1}-${index2}`}/>
                )
              })}
            </SidebarCollapse>
          );
        })
      }
    </>
  )
}

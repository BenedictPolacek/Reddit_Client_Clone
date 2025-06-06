import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import TopicsItems from "../TopicsItems";
import { render, screen } from "@testing-library/react";
import { TopicObject, topics, TopicsGroup } from "@/data/topics";
import { isTopicGroup } from "@/utils/topicUtils";

function getAllTopics(): TopicObject[]{
  return topics.flatMap((topicHead) => {
    return isTopicGroup(topicHead) ? Object.values(topicHead)[0] : topicHead
  })
};

function getAllTopicGroups(): TopicsGroup[]{
  return topics.filter((topicHead) => {
    return isTopicGroup(topicHead)
  })
};
const renderWithSidebar = () => {
  render(
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <TopicsItems/>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

describe('TopicItems', () => {
  it('renders all topic', () => {
    renderWithSidebar();
    const allTopics = getAllTopics();

    const topicItems = screen.getAllByTestId('topic');

    expect(topicItems).toHaveLength(allTopics.length);
  });
  it('renders each group of topics', () => {
    renderWithSidebar();
    const allTopicGroups = getAllTopicGroups()

    const topicGroups = screen.getAllByTestId('topic-group');

    expect(topicGroups).toHaveLength(allTopicGroups.length);
  });
})
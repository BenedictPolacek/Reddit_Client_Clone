import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import TopicsItems from "../TopicsItems";
import { render, screen } from "@testing-library/react";
import { isTopicGroup, TopicObject, topics, TopicsGroup } from "@/data/topics";

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
function getAllTopics(): TopicObject[]{
  return topics.flatMap((topicHead) => {
    return isTopicGroup(topicHead) ? Object.values(topicHead)[0] : topicHead
  })
}
function getAllTopicGroups(): TopicsGroup[]{
  return topics.filter((topicHead) => {
    return isTopicGroup(topicHead)
  })
}

describe('TopicItems', () => {
  it('renders all topic', () => {
    renderWithSidebar();
    const testId = 'topic';
    const allTopics = getAllTopics();

    const myElems = screen.getAllByTestId(testId);

    expect(myElems).toHaveLength(allTopics.length);
  });
  it('renders each group of topics', () => {
    renderWithSidebar();
    const testId = 'topicGroup';
    const allTopicGroups = getAllTopicGroups()

    const myElems = screen.getAllByTestId(testId);

    expect(myElems).toHaveLength(allTopicGroups.length);
  });
})
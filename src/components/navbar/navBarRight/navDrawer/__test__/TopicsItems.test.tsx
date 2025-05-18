import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import TopicsItems from "../TopicsItems";
import { render, screen } from "@testing-library/react";
import { getAllTopicGroups, getAllTopics } from "@/data/topics";

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
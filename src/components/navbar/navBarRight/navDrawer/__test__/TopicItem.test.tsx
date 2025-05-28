import { render, screen } from "@testing-library/react";
import TopicItem from "../TopicItem";
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";

const renderWithSidebar = (topic: string) => {
  render(
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <TopicItem topic={topic} />
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

describe('TopicItem', () => {
  it('displays topic name', () => {
    const input = 'Sport';
    const output = 'Sport';
    renderWithSidebar(input);

    const topicItem = screen.getByText(output);

    expect(topicItem).toBeInTheDocument();
  });
  it('displays topic name with converted underscores to spaces', () => {
    const input = 'Adventure_Games';
    const output = 'Adventure Games';
    renderWithSidebar(input);

    const topicItem = screen.getByText(output);

    expect(topicItem).toBeInTheDocument();
  });
  it('renders Link component with correct href based on input', () => {
    const input = 'Cringe_&_Facepalm';
    renderWithSidebar(input);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `/${input}`);
  });
});
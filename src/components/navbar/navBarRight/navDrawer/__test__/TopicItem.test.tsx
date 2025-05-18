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

    const myElem = screen.getByText(output);

    expect(myElem).toBeInTheDocument();
  });
  it('converts underscores to spaces in topic name', () => {
    const input = 'Adventure_Games';
    const output = 'Adventure Games';
    renderWithSidebar(input);

    const myElem = screen.getByText(output);

    expect(myElem).toBeInTheDocument();
  });
  it('has Link component', () => {
    const input = 'Animals_&_Pets';
    renderWithSidebar(input);

    const myElem = screen.getByRole('link');

    expect(myElem).toBeInTheDocument()
  });
  it('has href attribute', () => {
    const input = 'Cringe_&_Facepalm';
    renderWithSidebar(input);

    const myElem = screen.getByRole('link');

    expect(myElem).toHaveAttribute('href', `/${input}`);
  });
});
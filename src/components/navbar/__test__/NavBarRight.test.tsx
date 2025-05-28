import { fireEvent, render, screen, within } from '@testing-library/react'   
import NavBarRight from '../NavBarRight';   
import NavDrawer, { NavDrawerProps } from '../navBarRight/navDrawer/NavDrawer';
import router from 'next-router-mock';

const navDrawerTestId = 'nav-drawer';
jest.mock('../navBarRight/navDrawer/NavDrawer', () => {
  return {
    __esModule: true,
    default: jest.fn(({ children } : NavDrawerProps) => 
      <div data-testid={navDrawerTestId}>{children}</div>
    )
  }
});

const searchBarTestId = 'search-bar';
jest.mock('../navBarRight/SearchBar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid={searchBarTestId}>Search Bar</div>
  };
});

describe('NavBarRight', () => {
  beforeEach(() => {
    router.setCurrentUrl('/default');
    jest.clearAllMocks();
  });

  it('renders SearchBar component inside NavBarRight', async () => {   
    render(<NavBarRight><div>Drawer Content</div></NavBarRight>);

    const searchForm = screen.getByTestId(searchBarTestId);

    expect(searchForm).toBeInTheDocument();
  });
  it('renders NavDrawer with passed children', async () => {
    const testId = 'children';
    render(<NavBarRight><div data-testid={testId}>Drawer Content</div></NavBarRight>)

    const drawer = screen.getByTestId(navDrawerTestId);
    expect(drawer).toBeInTheDocument();

    const children = within(drawer).getByTestId(testId);
    expect(children).toBeInTheDocument()
  });
  it('displays topic button title based on pathname', () => {
    const input = 'Physics_and_Mathematics';
    const output = 'Physics and Mathematics';
    router.setCurrentUrl(`/${input}`);
    render(<NavBarRight><div>Drawer Content</div></NavBarRight>);

    const topicButton = screen.getByTestId('topic-button');

    expect(topicButton).toBeInTheDocument();
    expect(topicButton).toHaveTextContent(output);
  });
  it("shows 'Topics' title in topic button when pathname is /search", () => {
    const input = 'search';
    const output = 'Topics';
    router.setCurrentUrl(`/${input}`); 
    render(<NavBarRight><div>Drawer Content</div></NavBarRight>);

    const topicButton = screen.getByTestId('topic-button');

    expect(topicButton).toBeInTheDocument();
    expect(topicButton).toHaveTextContent(output);
  });
  it('closes NavDrawer when pathname changes', async () => {
    const { rerender } = render(<NavBarRight><div>Drawer Content</div></NavBarRight>);

    const topicButton = screen.getByTestId('topic-button');
    expect(topicButton).toBeInTheDocument();
    expect(NavDrawer).toHaveBeenLastCalledWith(expect.objectContaining({isOpen: false}), undefined);

    fireEvent.click(topicButton);
    expect(NavDrawer).toHaveBeenLastCalledWith(expect.objectContaining({isOpen: true}), undefined);

    router.setCurrentUrl('/Movies');
    rerender(<NavBarRight><div>Drawer Content</div></NavBarRight>); // mocked usePathname - does not rerender component automatically
    expect(NavDrawer).toHaveBeenLastCalledWith(expect.objectContaining({isOpen: false}), undefined);
  });
})
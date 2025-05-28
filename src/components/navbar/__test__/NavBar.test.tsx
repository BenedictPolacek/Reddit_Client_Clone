import { fireEvent, render, screen, within } from "@testing-library/react"
import NavBar from "../NavBar"; 
import router from 'next-router-mock';

describe('NavBar', () => {
  beforeEach(() => {
    router.setCurrentUrl('/default');
    jest.restoreAllMocks();
  });

  it('renders main and drawer SearchBar components', () => {
    render(<NavBar/>);

    const searchBar = screen.getByTestId('search-bar');
    const drawer = screen.getByTestId('drawer');
    const drawerSearchBar = within(drawer).getByTestId('drawer-search-bar')
    
    expect(searchBar).toBeInTheDocument();
    expect(drawerSearchBar).toBeInTheDocument();
  });
  it('renders author brand linking to personal website', () => {
    render(<NavBar/>);

    const authorBrand = screen.getByTestId('author-brand');

    expect(authorBrand).toBeInTheDocument();
    expect(authorBrand).toHaveAttribute('href', 'https://benedictpolacek.github.io/BenedictPolacek-Personal-Portfolio-Website/');
  });
  it('has same href and text in link component', () => {
    const topic = 'Funny';
    render(<NavBar/>);

    const topicButton = screen.getByTestId('topic-button');
    expect(topicButton).toBeInTheDocument();

    fireEvent.click(topicButton);
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toBeInTheDocument();

    const topicLinks = within(drawer).getAllByRole('link');
    topicLinks.forEach((topicLink) => {
      const matchedTopic = within(topicLink).queryByText(topic);
      if(matchedTopic){
        expect(topicLink).toHaveAttribute('href', `/${topic}`);
      }
    });
  });
  it('executes search from NavBar SearchBar', () => {
    const input = 'tiny cats';
    const output = '/search?term=tiny_cats';
    render(<NavBar/>);

    const searchForm = screen.getByTestId('search-bar');

    const searchInput = within(searchForm).getByTestId('search-input');
    const searchButton = within(searchForm).getByTestId('search-button');
    fireEvent.change(searchInput, {target: {value: input}});
    fireEvent.click(searchButton);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(router.asPath).toEqual(output);

  });
  it('executes search from Drawer SearchBar', () => {
    const input = 'tiny cats';
    const output = '/search?term=tiny_cats';
    render(<NavBar/>);

    const searchForm = screen.getByTestId('drawer-search-bar');
    expect(searchForm).toBeInTheDocument();

    const searchInput = within(searchForm).getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const searchButton = within(searchForm).getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, {target: {value: input}});
    expect(searchInput).toHaveValue(input);

    fireEvent.click(searchButton);
    expect(router.asPath).toEqual(output);
  })
})
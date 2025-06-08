import { render, screen, waitFor } from "@testing-library/react";
import React, { use } from "react";
import Home from "../page";
import useGetData from "@/hooks/useGetData";
import {useInViewState} from "@/hooks/useInViewStates";
import { PostData } from "@/lib/api";
import Post from "@/components/posts/Post";

jest.mock("../../../hooks/useGetData", () => ({ __esModule: true, default: jest.fn(() => {})}))
jest.mock("../../../hooks/useInViewStates", () => ({ __esModule: true, useInViewState: jest.fn()}));
jest.mock("react", () => ({...jest.requireActual("react"), use: jest.fn()}));
jest.mock("../../../components/loading/LoadingLayout", () => () => (
  <div>Loading...</div>
));
jest.mock('../../../components/posts/Post', () => ({
  __esModule: true,
  default: jest.fn(({ title }) => <div data-testid="post">{title}</div>)
}));
jest.mock('../../../components/posts/PostLayout', () => ({
  __esModule: true,
  default: jest.fn(({ data }) => <div data-testid="post-layout">{data}</div>)
}));
const mockPosts: PostData[] = [
  {
    data: {
      author: "author1",
      title: "title1",
      selftext: "selftext1",
      created: 1720000000,
      url: "https://example.com/image1.jpg",
      thumbnail: "https://example.com/thumb1.jpg",
      is_video: false,
    },
  },
  {
    data: {
      author: "author2",
      title: "title2",
      selftext: "selftext2",
      created: 1720000100,
      url: "https://example.com/image2.jpg",
      thumbnail: "https://example.com/thumb2.jpg",
      is_video: false,
    },
  },
  {
    data: {
      author: "author3",
      title: "title3",
      selftext: "selftext3",
      created: 1720000200,
      url: "https://example.com/video.jpg",
      thumbnail: "https://example.com/thumb3.jpg",
      is_video: true,
      media: {
        reddit_video: {
          fallback_url: "https://example.com/video.mp4",
        },
      },
    },
  },
  {
    data: {
      author: "author4",
      title: "title4",
      selftext: "selftext4",
      created: 1720000300,
      url: "https://example.com/image4.jpg",
      thumbnail: "https://example.com/thumb4.jpg",
      is_video: false,
    },
  },
  {
    data: {
      author: "author5",
      title: "title5",
      selftext: "selftext5",
      created: 1720000400,
      url: "https://example.com/image5.jpg",
      thumbnail: "https://example.com/thumb5.jpg",
      is_video: false,
    },
  },
];
describe("Home component", () => {
  const paramsValue = { topic: "Popular" };
  const searchParamsValue = { term: undefined };

  const params = Promise.resolve(paramsValue);
  const searchParams = Promise.resolve(searchParamsValue);

  const setupParams = {
    params,
    searchParams,
  };
  beforeEach(() => {
    (use as jest.Mock).mockImplementation((arg: any) => {
      if (arg instanceof Promise) {
        return arg === params ? paramsValue : searchParamsValue;
      }
      return arg;
    });

    (useInViewState as jest.Mock).mockReturnValue({
      inViews: [false, false],
      inViewHandler: jest.fn(),
      inViewCount: 2,
    });

  });

  it("renders loading layout during initial fetch", async() => {
    (useGetData as jest.Mock).mockReturnValue({
      initialFetch: true,
      isUninitialized: false,
      isFetching: false,
      data: undefined,
    });

    render(<Home params={params} searchParams={searchParams} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument(); 
  });

  it("throws error when no data is returned", () => {
    (useGetData as jest.Mock).mockReturnValue({
      initialFetch: false,
      isUninitialized: false,
      isFetching: false,
      data: undefined,
    });

    expect(() => render(<Home params={params} searchParams={searchParams} />)).toThrow("No data returned");
  });

  it("renders posts and passes them to PostLayout", () => {
    (useGetData as jest.Mock).mockReturnValue({
      data: mockPosts,
      initialFetch: false,
      isFetching: false,
      isUninitialized: false,
    });

    render(<Home params={params} searchParams={searchParams} />);
    
    expect(screen.getAllByTestId("post")).toHaveLength(mockPosts.length);
    expect(screen.getByTestId("post-layout")).toBeInTheDocument();
  });

  it("only last N posts receive inViewHandler", async() => {
    const mockInViewHandler = jest.fn().mockReturnValue(jest.fn());
    (useInViewState as jest.Mock).mockReturnValue({
      inViews: [false, false],
      inViewHandler: mockInViewHandler,
      inViewCount: 2,
    });

    (useGetData as jest.Mock).mockReturnValue({
      data: mockPosts,
      initialFetch: false,
      isFetching: false,
      isUninitialized: false,
    });

    render(<Home params={params} searchParams={searchParams}/>);
    
    expect(Post).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "title4",
        isLast: true,
        inViewHandler: expect.any(Function)
      }), undefined
    );
    expect(Post).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "title5",
        isLast: true,
        inViewHandler: expect.any(Function)
      }), undefined
    );
  });
});
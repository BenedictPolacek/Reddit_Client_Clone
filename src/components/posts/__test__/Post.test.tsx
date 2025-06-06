import { render, screen } from "@testing-library/react";
import PostHeader, { PostHeaderProps } from "../postBody/PostHeader";
import PostText, { PostTextProps } from "../postBody/PostText";
import PostTitle, { PostTitleProps } from "../postBody/PostTitle";
import Post, { PostProps } from "../Post";
import { getTimeAgo } from '../../../utils/postUtils';

const ref = jest.fn()
jest.mock('react-intersection-observer', () => ({
  useInView: () => [ref, true]
}));

const postHeaderTestId = 'post-header';
jest.mock('../postBody/PostHeader', () => {
  return {
    __esModule: true,
    default: jest.fn(({author, postedAgo, videoUrl, pictureUrl} : PostHeaderProps) => 
      <div data-testid={postHeaderTestId}></div>
    )
  }
});

const postTitleTestId = 'post-title';
jest.mock('../postBody/PostTitle', () => {
  return {
    __esModule: true,
    default: jest.fn(({title, thumbnailUrl, lastRef} : PostTitleProps) => 
      <div data-testid={postTitleTestId}></div>
    )
  }
});

const postTextTestId = 'post-text';
jest.mock('../postBody/PostText', () => {
  return {
    __esModule: true,
    default: jest.fn(({text} : PostTextProps) => 
      <div data-testid={postTextTestId}></div>
    )
  }
});

describe('Post', () => {
  const defaultProps: PostProps = {
    author: 'Joe Doe', 
    title: 'World Domination', 
    text: undefined, 
    createdAt: 8000, 
    pictureUrl: '', 
    thumbnailUrl: '', 
    videoUrl: undefined, 
    isLast: false, 
    inViewHandler: undefined
  };

  const defaultPostHeaderProps = {
    author: defaultProps.author, 
    postedAgo: getTimeAgo(defaultProps.createdAt),
    videoUrl: defaultProps.videoUrl,
    pictureUrl: defaultProps.pictureUrl || undefined
  }
  const defaultPostTitleProps = {
    title: defaultProps.title,
    thumbnailUrl: defaultProps.thumbnailUrl || undefined, 
    lastRef: ref
  }
  const videoUrl = 'http://examplevideo.mp4';
  const pictureUrl = 'http://examplepicture.png';
  const thumbnailUrl = 'http://examplethumbnail.jpg';

  it('displays PostHeader', () => {
    render(<Post {...defaultProps}/>);

    const headerElem = screen.getByTestId(postHeaderTestId);

    expect(headerElem).toBeInTheDocument();
  });
  it('displays PostTitle', () => {
    render(<Post {...defaultProps}/>);

    const titleElem = screen.getByTestId(postTitleTestId);

    expect(titleElem).toBeInTheDocument();
  });
  it('displays PostText', () => {
    render(<Post {...defaultProps}/>);

    const textElem = screen.getByTestId(postTextTestId);

    expect(textElem).toBeInTheDocument();
  });
  it('renders PostHeader with default PostHeader props', () => {
    render(<Post {...defaultProps}/>);

    const headerElem = screen.getByTestId(postHeaderTestId);

    expect(PostHeader).toHaveBeenCalledWith(expect.objectContaining(defaultPostHeaderProps), undefined);
  });
  it('renders PostTitle with default PostTitle props', () => {
    render(<Post {...defaultProps}/>);

    const titleElem = screen.getByTestId(postTitleTestId);

    expect(PostTitle).toHaveBeenCalledWith(expect.objectContaining(defaultPostTitleProps), undefined);
  });
  it('renders PostText with default props', () => {
    render(<Post {...defaultProps}/>);

    const textElem = screen.getByTestId(postTextTestId);

    expect(PostText).toHaveBeenCalledWith(expect.objectContaining({text: defaultProps.text}), undefined);
  });
  it('prioritizes videoUrl over any other url', () => {
    const postProps = {
      ...defaultProps,
      videoUrl,
      pictureUrl,
      thumbnailUrl,
    };
    const postHeaderProps = {
      ...defaultPostHeaderProps,
      videoUrl, 
      pictureUrl: undefined
    }
    const postTitleProps = {
      ...defaultPostTitleProps,
      thumbnailUrl: undefined
    }
    render(<Post {...postProps}/>)

    expect(PostHeader).toHaveBeenCalledWith(expect.objectContaining(postHeaderProps), undefined);
    expect(PostTitle).toHaveBeenCalledWith(expect.objectContaining(postTitleProps), undefined);
  });
  it('prioritizes pictureUrl over thumbnailUrl', () => {
    const postProps = {
      ...defaultProps,
      pictureUrl,
      thumbnailUrl,
    };
    const postHeaderProps = {
      ...defaultPostHeaderProps, 
      pictureUrl: pictureUrl
    }
    const postTitleProps = {
      ...defaultPostTitleProps,
      thumbnailUrl: undefined
    }
    render(<Post {...postProps}/>)

    expect(PostHeader).toHaveBeenCalledWith(expect.objectContaining(postHeaderProps), undefined);
    expect(PostTitle).toHaveBeenCalledWith(expect.objectContaining(postTitleProps), undefined);
  });
})
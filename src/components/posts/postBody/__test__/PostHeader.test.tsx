import { render, screen, within } from "@testing-library/react";
import PostHeader from "../PostHeader";

describe("PostHeader", () => {
  const defaultObject = {
    author: "joeDoe",
    postedAgo: "4 days ago",
  }
  it("displays only author name and time when no video or picture is provided", () => {
    render(<PostHeader {...defaultObject} />);

    const authorElem = screen.getByText(defaultObject.author)
    const postedAgoElem = screen.getByText(defaultObject.postedAgo)
    const videoElem = screen.queryByTestId("video-player")
    const imgElem = screen.queryByRole("img")

    expect(authorElem).toBeInTheDocument();
    expect(postedAgoElem).toBeInTheDocument();
    expect(videoElem).not.toBeInTheDocument();
    expect(imgElem).not.toBeInTheDocument();
  });
  it("displays video when provided", () => {
    const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";  
    render(<PostHeader {...defaultObject} videoUrl={videoUrl} />);

    const authorElem = screen.getByText(defaultObject.author)
    const postedAgoElem = screen.getByText(defaultObject.postedAgo)
    const videoElem = screen.queryByTestId("video-player")
    const imgElem = screen.queryByRole("img")

    expect(authorElem).toBeInTheDocument();
    expect(postedAgoElem).toBeInTheDocument();
    expect(videoElem).toBeInTheDocument();
    expect(imgElem).not.toBeInTheDocument();
  });

  it("displays skeleton when video URL is invalid", () => {
    const invalidVideoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBu";
    render(<PostHeader {...defaultObject} videoUrl={invalidVideoUrl} />);

    const authorElem = screen.getByText(defaultObject.author)
    const postedAgoElem = screen.getByText(defaultObject.postedAgo)
    const videoElem = screen.queryByTestId("video-player")
    const skeleton = videoElem && within(videoElem).queryByTestId("invalid url");
    const imgElem = screen.queryByRole("img")

    expect(authorElem).toBeInTheDocument();
    expect(postedAgoElem).toBeInTheDocument();
    expect(videoElem).toBeInTheDocument();
    expect(skeleton).toBeInTheDocument();
    expect(imgElem).not.toBeInTheDocument();
  });

  it("displays image when picture is provided", () => {
    const pictureUrl = "https://i.redd.it/0hobp82uta3f1.jpeg";
    render(<PostHeader {...defaultObject} pictureUrl={pictureUrl} />);

    const authorElem = screen.getByText(defaultObject.author)
    const postedAgoElem = screen.getByText(defaultObject.postedAgo)
    const videoElem = screen.queryByTestId("video-player")
    const imgElem = screen.queryByRole("img")

    expect(authorElem).toBeInTheDocument();
    expect(postedAgoElem).toBeInTheDocument();
    expect(videoElem).not.toBeInTheDocument();
    expect(imgElem).toBeInTheDocument();
  });
});
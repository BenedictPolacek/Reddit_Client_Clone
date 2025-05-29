import { render, screen } from "@testing-library/react";
import PostTitle from "../PostTitle";
import React from "react";

describe('PostTitle', () => {
  it('displays title text', () => {
    const title = 'Title example';
    render(<PostTitle title={title}/>);

    const titleText = screen.getByText(title);

    expect(titleText).toBeInTheDocument();
  });
  it('passes ref to title div element', () => {
    const title = 'Title example';
    const ref = jest.fn()
    render(<PostTitle title={title} lastRef={ref}/>);

    const titleElem = screen.getByTestId('title-elem');

    expect(titleElem).toBeInTheDocument();
    expect(ref).toHaveBeenCalledWith(titleElem)
  });
  it('displays thumbnail when passed', () => {
    const title = 'Title example';
    const thumbnailUrl = 'https://i.redd.it/0hobp82uta3f1.jpeg';
    render(<PostTitle title={title} thumbnailUrl={thumbnailUrl}/>);

    const imgElem = screen.queryByRole('img')

    expect(imgElem).toBeInTheDocument();
    expect(imgElem).toHaveAttribute('src', thumbnailUrl);
  });
  it('does not display thumbnail when not passed', () => {
  const title = 'Title example';
  render(<PostTitle title={title} />);

  const imgElem = screen.queryByRole('img');
  
  expect(imgElem).not.toBeInTheDocument();
});
})
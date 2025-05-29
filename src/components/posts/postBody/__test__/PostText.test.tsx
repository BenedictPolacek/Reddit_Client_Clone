import { render, screen } from "@testing-library/react";
import PostText from "../PostText";

describe('PostText', () => {
  it('displays texts', () => {
    const text = 'Some text';
    render(<PostText text={text}/>);

    const textElem = screen.queryByText(text);

    expect(textElem).toBeInTheDocument();
  });
})
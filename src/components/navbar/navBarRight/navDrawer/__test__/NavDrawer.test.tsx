import { render, screen } from "@testing-library/react"
import NavDrawer from "../NavDrawer"

describe('NavDrawer', () => {
  it('renders children', () => {
    render(<NavDrawer isOpen={false} onHandleClose={() => {}}><div data-testid="child">Test child</div></NavDrawer> )

    const myElem = screen.getByText('Test child');

    expect(myElem).toBeInTheDocument();
  });
})
import { render, screen } from "@testing-library/react"
import NavDrawer from "../NavDrawer"

describe('NavDrawer', () => {
  it('renders children', () => {
    render(<NavDrawer isOpen={false} onHandleClose={() => {}}><div data-testid="children">Test child</div></NavDrawer> )

    const children = screen.getByTestId('children');

    expect(children).toBeInTheDocument();
  });
})
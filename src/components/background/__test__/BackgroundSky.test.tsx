import { act, render, screen } from '@testing-library/react'
import BackgroundSky from "../BackgroundSky";

function setScreenWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  act(() => {
    window.dispatchEvent(new Event('resize')); // ✅ This is the fix
  });
}

describe('BackgroundSky', () => {
  it('renders a single background block when screen width is below 1878px', () => {
    render(<BackgroundSky/>)
    setScreenWidth(500)

    const backgrounds = screen.getAllByTestId('background-sky');

    expect(backgrounds).toHaveLength(1)
  });
  it('renders two background blocks when screen width is above 1878px and below 3756px', () => {
    render(<BackgroundSky/>)
    setScreenWidth(3000)

    const backgrounds = screen.getAllByTestId('background-sky');

    expect(backgrounds).toHaveLength(2)
  });
  it('renders three background blocks when screen width is above 3756px and below 5634px', () => {
    render(<BackgroundSky/>)
    setScreenWidth(5000)

    const backgrounds = screen.getAllByTestId('background-sky');

    expect(backgrounds).toHaveLength(3)
  });
  it('renders four background blocks when screen width is above 5634px and below 7512px', () => {
    render(<BackgroundSky/>)
    setScreenWidth(7000)

    const backgrounds = screen.getAllByTestId('background-sky');

    expect(backgrounds).toHaveLength(4)
  });
  it('sets correct left offset for each background block', () => {
    setScreenWidth(4000);
    render(<BackgroundSky />);

    const backgrounds = screen.getAllByTestId('background-sky');
  
    backgrounds.forEach((bg, i) => {
      expect(bg).toHaveStyle(`left: ${i * 1878}px`);
    });
  });
})


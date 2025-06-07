import { renderHook, act } from '@testing-library/react';
import { useWindowWidth } from '../useWindowWidth';

describe('useWindowWidth', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('initializes with default width if window is undefined', () => {
    const { result } = renderHook(() => useWindowWidth());
    expect(result.current).toBe(1024);
  });

  it('initializes to current window.innerWidth regardless of fallback value', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 });
    const { result } = renderHook(() => useWindowWidth(999));
    expect(result.current).toBe(800);
  });

  it('updates state when window is resized', () => {
    const { result } = renderHook(() => useWindowWidth());

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(600);
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowWidth());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('onload', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
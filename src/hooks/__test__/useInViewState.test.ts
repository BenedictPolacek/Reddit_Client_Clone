import { act, renderHook } from '@testing-library/react';
import { useInViewState } from '../useInViewStates';

describe('useInViewState', () => {
  it('initializes with false values', () => {
    const { result } = renderHook(() => useInViewState(3));

    expect(result.current.inViews).toEqual([false, false, false]);
  });

  it('defaults to 2 false values if no count given', () => {
    const { result } = renderHook(() => useInViewState());

    expect(result.current.inViews).toEqual([false, false]);
  });

  it('updates specific index using inViewHandler', () => {
    const { result } = renderHook(() => useInViewState(3));

    act(() => {
      result.current.inViewHandler(1)(true);
    });

    expect(result.current.inViews).toEqual([false, true, false]);

    act(() => {
      result.current.inViewHandler(0)(true);
    });

    expect(result.current.inViews).toEqual([true, true, false]);
  });

  it('does not update if value is unchanged', () => {
    const { result } = renderHook(() => useInViewState(2));

    const original = result.current.inViews;

    act(() => {
      result.current.inViewHandler(0)(false);
    });

    expect(result.current.inViews).toBe(original);
  });
});
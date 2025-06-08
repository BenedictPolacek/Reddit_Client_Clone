import { act, renderHook, waitFor } from '@testing-library/react';
import useGetData from '../useGetData';
import { useLazyGetRedditDataQuery } from '@/lib/api';

const mockTrigger = jest.fn().mockResolvedValue({});
jest.mock('../../lib/api', () => {
  return {
    __esModule: true,
    useLazyGetRedditDataQuery: jest.fn()
  }
})
beforeEach(() => {
  jest.clearAllMocks();
});

describe('useGetData', () => {
  it('should call trigger on first render when uninitialized', async () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: undefined,
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: true,
      },
    ]);
    await waitFor(() => {
      renderHook(() => useGetData('topic', undefined, [false, false]));
    })
    
    expect(mockTrigger).toHaveBeenCalledWith({ topic: 'topic', searchTerm: undefined });
  });
  it('should call trigger if inViews contains true and has "after" data', async () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: { after: 'abc123', children: [{ id: '1', title: 'post' }] },
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);
    act(() => {
      renderHook(() => useGetData('topic', undefined, [true, false, false]));
    })
    expect(mockTrigger).toHaveBeenCalledWith({
      topic: 'topic',
      searchTerm: undefined,
      after: 'abc123',
    });
  });
  it('should not call trigger if it does not have "after" data', () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: { children: [{ id: '1', title: 'post' }] },
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);
    act(() => {
      renderHook(() => useGetData('topic', undefined, [true, false, false]));
    })
    expect(mockTrigger).not.toHaveBeenCalled()
  })
  it('should not call trigger if isFetching is true and was initialized', () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: { after: 'abc123', children: [{ id: '1', title: 'post' }] },
        isFetching: true,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);
    act(() => {
      renderHook(() => useGetData('topic', undefined, [true, false, false]));
    })
    expect(mockTrigger).not.toHaveBeenCalled();
  });
  it('should not call trigger more than 1 time if inViews contains still true', () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: { after: 'abc123', children: [{ id: '1', title: 'post' }] },
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);
    act(() => {
      const { rerender } = renderHook(({ topic, searchTerm, inViews }: 
        {topic: string, searchTerm: string | undefined, inViews: boolean[]}) => useGetData(topic, searchTerm, inViews),
      {
        initialProps: {
          topic: 'topic',
          searchTerm: undefined,
          inViews: [true, false, false],
        },
      });
      rerender({ topic: 'topic', searchTerm: undefined, inViews: [true, false, false] });
      rerender({ topic: 'topic', searchTerm: undefined, inViews: [true, false, false] });
    })
    expect(mockTrigger).toHaveBeenCalledTimes(1);
  });
  it('should call trigger when searchTerm changes', async () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: undefined,
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);
    
    await waitFor(async () => {
      const { rerender } = await renderHook(({ topic, searchTerm, inViews }: 
        {topic: string, searchTerm: string | undefined, inViews: boolean[]}) => useGetData(topic, searchTerm, inViews),
        {
          initialProps: {
            topic: 'search',
            searchTerm: 'example1',
            inViews: [false, false],
          },
        }
      );
    
      expect(mockTrigger).toHaveBeenCalledWith({
        topic: 'search',
        searchTerm: 'example1',
      });

      await rerender({ topic: 'search', searchTerm: 'example2', inViews: [false, false] });
    })

    expect(mockTrigger).toHaveBeenLastCalledWith({
      topic: 'search',
      searchTerm: 'example2',
    });
    expect(mockTrigger).toHaveBeenCalledTimes(2);
  })
  it('should throw error if fetching failed', () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: undefined,
        isFetching: false,
        isError: true,
        error: new Error('Fetch failed'),
        isUninitialized: false,
      },
    ]);
    expect.assertions(1);
      
    try{
      act(() => {
        renderHook(() => useGetData('reactjs', 'hooks', [false]))
      })
    } catch(error: any) {
      expect(error.message).toBe('Failed to fetch data.');
    }
  });
  it('should throw error if data.children is empty', () => {
    (useLazyGetRedditDataQuery as jest.Mock).mockReturnValue([
      mockTrigger,
      {
        data: { children: [] },
        isFetching: false,
        isError: false,
        error: null,
        isUninitialized: false,
      },
    ]);

    expect.assertions(1);
    try{
      act(() => {
        renderHook(() => useGetData('topic', 'hooks', [false]))
      })
    } catch(error: any) {
      expect(error.message).toBe('No posts returned.');
    }
  });
});
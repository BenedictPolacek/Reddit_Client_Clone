import { getAllByTestId, render, screen, within } from "@testing-library/react"
import PostLayout from "../PostLayout"

let width: number = 1024;
jest.mock('../../../hooks/useWindowWidth', () => {
  return {
    __esModule: true,
    useWindowWidth: () => width
  }
});

describe('PostLayout', () => {
  const data = [
    <div key='1' data-testid='test-item'></div>,
    <div key='2' data-testid='test-item'></div>,
    <div key='3' data-testid='test-item'></div>,
    <div key='4' data-testid='test-item'></div>,
    <div key='5' data-testid='test-item'></div>,
  ]
  describe('on small screens (<1024px)', () => {
    beforeAll(() => {
      width = 500
    });
    it('renders all items in a single column', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const column = screen.getByTestId('whole-data');
      const wholeData = within(column).getAllByTestId('test-item');

      expect(wholeData.length).toBe(data.length)
    });
    it('does not render any items in the split columns', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const dataColumns = screen.getAllByTestId('splitted-data');
      expect(dataColumns).toHaveLength(2);
      
      const firstHalf = dataColumns[0];
      const secondHalf = dataColumns[1];

      const firstData = within(firstHalf).queryAllByTestId('test-item');
      const secondData = within(secondHalf).queryAllByTestId('test-item');

      const sum = firstData.length + secondData.length
      expect(sum).toBe(0);
    });
    it('does not show a skeleton at the end of the single column', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const column = screen.getByTestId('whole-data');
      const skeleton = within(column).queryByTestId('skeleton');

      expect(skeleton).not.toBeInTheDocument();
    })
    it('shows a skeleton at the end of the single column when fetching', () => {
      render(<PostLayout data={data} isFetching={true}/>);

      const column = screen.getByTestId('whole-data');
      const skeleton = within(column).queryByTestId('skeleton');

      expect(skeleton).toBeInTheDocument();
    })
  });

  describe('on large screens (>=1024px)', () => {
    beforeAll(() => {
      width = 2000;      
    });
    it('splits the items evenly into two columns', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const dataColumns = screen.getAllByTestId('splitted-data');
      expect(dataColumns).toHaveLength(2);

      const firstHalf = dataColumns[0];
      const secondHalf = dataColumns[1];

      const firstData = within(firstHalf).getAllByTestId('test-item');
      const secondData = within(secondHalf).getAllByTestId('test-item');

      const sum = firstData.length + secondData.length
      expect(sum).toBe(data.length)
    });
    it('does not render the single-column layout', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const column = screen.getByTestId('whole-data');

      const wholeData = within(column).queryAllByTestId('test-item');

      expect(wholeData.length).toBe(0)
    });
    it('does not show skeletons at the end of both columns', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const dataColumns = screen.getAllByTestId('splitted-data');
      expect(dataColumns).toHaveLength(2);
      
      const firstHalf = dataColumns[0];
      const secondHalf = dataColumns[1];

      const firstSkeleton = within(firstHalf).queryByTestId('skeleton');
      const secondSkeleton = within(secondHalf).queryByTestId('skeleton');

      expect(firstSkeleton).not.toBeInTheDocument();
      expect(secondSkeleton).not.toBeInTheDocument();
    });
    it('shows skeletons at the end of both columns when fetching', () => {
      render(<PostLayout data={data} isFetching={true}/>);

      const dataColumns = screen.getAllByTestId('splitted-data');
      expect(dataColumns).toHaveLength(2);
      
      const firstHalf = dataColumns[0];
      const secondHalf = dataColumns[1];

      const firstSkeleton = within(firstHalf).getByTestId('skeleton');
      const secondSkeleton = within(secondHalf).getByTestId('skeleton');

      expect(firstSkeleton).toBeInTheDocument();
      expect(secondSkeleton).toBeInTheDocument();
    });
    it('splits items evenly', () => {
      render(<PostLayout data={data} isFetching={false}/>);

      const dataColumns = screen.getAllByTestId('splitted-data');
      expect(dataColumns).toHaveLength(2);

      const firstHalf = dataColumns[0];
      const secondHalf = dataColumns[1];

      const firstData = within(firstHalf).getAllByTestId('test-item');
      const secondData = within(secondHalf).getAllByTestId('test-item');

      expect(Math.abs(firstData.length - secondData.length)).toBeLessThanOrEqual(1);
    })
  });
})
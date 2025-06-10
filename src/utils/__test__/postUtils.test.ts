import React from "react";
import { getHalf, getTimeAgo, isPictureFormat } from "../postUtils";

describe('getHalf', () => {
  const makeElement = (label: string) => React.createElement('div', {}, label)
  const elements = ['A', 'B', 'C', 'D', 'E', 'F'].map(makeElement);

  test('returns elements at even indexes for half = 1', () => {
    const Elems = getHalf(elements, 1) as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>[];
    const result = Elems.map(e => e.props.children)
    expect(result).toEqual(['A', 'C', 'E']);
  });

  test('returns elements at odd indexes for half = 2', () => {
    const Elems = getHalf(elements, 2) as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>[];
    const result = Elems.map(e => e.props.children)
    expect(result).toEqual(['B', 'D', 'F']);
  });

  test('returns empty array for empty input', () => {
    const FirstHalf = getHalf([], 1)
    const SecondHalf = getHalf([], 2)

    expect(FirstHalf).toEqual([]);
    expect(SecondHalf).toEqual([]);
  });

  test('handles single-element array', () => {
    const single = [makeElement('X')];

    const FirstHalf = getHalf(single, 1) as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>[];
    const result1 = FirstHalf.map(e => e.props.children)
    const SecondHalf = getHalf(single, 2) as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>[];
    const result2 = SecondHalf.map(e => e.props.children)

    expect(result1).toEqual(['X']);
    expect(result2).toEqual([]);
  });
});

describe('getTimeAgo', () => {
  const nowInSeconds = 1_700_000_000;
  const nowInMillis = nowInSeconds * 1000;

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(nowInMillis);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('returns "X seconds ago"', () => {
    const seconds = 10;
    const input = nowInSeconds - seconds;
    const output = '10 seconds ago';

    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });

  test('returns "X minutes ago"', () => {
    const minutes = 3;
    const input = nowInSeconds - minutes * 60;
    const output = '3 minutes ago';
    
    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });

  test('returns "X hours ago"', () => {
    const hours = 5;
    const input = nowInSeconds - hours * 60 * 60;
    const output = '5 hours ago';
    
    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });

  test('returns "X days ago"', () => {
    const days = 10;
    const input = nowInSeconds - days * 60 * 60 * 24;
    const output = '10 days ago';
    
    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });

  test('returns "X years ago"', () => {
    const days = 3;
    const input = nowInSeconds - days * 60 * 60 * 24 * 365.25;
    const output = '3 years ago';
    
    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });
  test('returns "0 seconds ago"', () => {
    const seconds = 0;
    const input = nowInSeconds - seconds
    const output = '0 seconds ago';
    
    const result = getTimeAgo(input);

    expect(result).toBe(output);
  });
});


describe('isPictureFormat', () => {
  test('returns true for .png', () => {
    const url = 'https://example.com/image.png';
    const result = isPictureFormat(url)
    expect(result).toBe(true);
  });

  test('returns true for .jpg', () => {
    const url = 'https://example.com/image.jpg';
    const result = isPictureFormat(url)
    expect(result).toBe(true);
  });

  test('returns true for .jpeg', () => {
    const url = 'https://example.com/image.jpeg';
    const result = isPictureFormat(url)
    expect(result).toBe(true);
  });

  test('returns true for .svg', () => {
    const url = 'https://example.com/icon.svg';
    const result = isPictureFormat(url)
    expect(result).toBe(true);
  });

  test('returns false for other file types', () => {
    const url1 = 'https://example.com/file.pdf';
    const url2 = 'https://example.com/file.txt';
    const result1 = isPictureFormat(url1)
    const result2 = isPictureFormat(url2)
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  test('returns true even if format is in query params', () => {
    const url = 'https://example.com/api?file=image.jpg';
    const result = isPictureFormat(url)
    expect(result).toBe(true);
  });
});
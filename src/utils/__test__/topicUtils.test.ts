import { humanizePath, isTopicGroup, matchPath, searchForEndpoint } from "@/utils/topicUtils";
import { TopicHead, TopicObject, TopicsGroup } from "../../data/topics"

jest.mock('../../data/topics', () => {
  const mockTopics: TopicHead[]  = [
    {
      "title": [
        { name: "name1", endpoint: "endpoint1" },
        { name: "name2", endpoint: "endpoint2" },
        { name: "name3", endpoint: "endpoint3" },
      ]
    },
    { name: "name4", endpoint: "endpoint4" },
    { name: "name5", endpoint: "endpoint5" },
    { name: "name6", endpoint: "endpoint6" },
  ]
  return {
    __esModule: true,
    topics: mockTopics,
  }
});

describe('isTopicGroup', () => {
  it('returns true when topicHead is a TopicsGroup', () => {
    const input: TopicsGroup = {
      "title": [
        { name: "name1", endpoint: "endpoint1" },
        { name: "name2", endpoint: "endpoint2" },
        { name: "name3", endpoint: "endpoint3" },
      ]
    }

    const output = isTopicGroup(input);

    expect(output).toBe(true);
  });
  it('returns false when topicHead is a TopicObject', () => {
    const input: TopicObject = { name: "name1", endpoint: "endpoint1" };

    const output = isTopicGroup(input);

    expect(output).toBe(false);
  });
});

describe('matchPath', () => {
  it('returns true when pathname matches one of the topics', () => {
    const pathname = '/name4'
    const result = matchPath(pathname);
    expect(result).toBe(true);
  });
  it('returns true when pathname matches one of the topics nested in TopicGroup', () => {
    const pathname = '/name1'
    const result = matchPath(pathname);
    expect(result).toBe(true);
  });
  it('returns true when pathname is /search', () => {
    const pathname = '/search'
    const result = matchPath(pathname);
    expect(result).toBe(true);
  });
  it('returns true when pathname matches one of the topics even if end with "/"', () => {
    const pathname = '/name5/'
    const result = matchPath(pathname);
    expect(result).toBe(true);
  });
  it('returns false when pathname does not match one of the topics', () => {
    const pathname = '/Wrong'
    const result = matchPath(pathname);
    expect(result).toBe(false);
  });
});

describe('humanizePath', () => {
  it('return string with spaces instead of underscores', () => {
    const input = 'simply_good_and_small'
    const output = 'simply good and small'

    const result = humanizePath(input);

    expect(result).toBe(output);
  });
  it('return string as is when there are no underscores', () => {
    const input = 'simply/good*and4small'
    const output = 'simply/good*and4small'

    const result = humanizePath(input);

    expect(result).toBe(output);
  });
  it('return string with spaces as is', () => {
    const input = 'simply good and small'
    const output = 'simply good and small'

    const result = humanizePath(input);

    expect(result).toBe(output);
  });
})
describe('searchForEndpoint', () => {
  it('returns correct endpoint', () => {
    const input = 'name4'
    const output = 'endpoint4'

    const result = searchForEndpoint(input);

    expect(result).toBe(output);
  });
  it('returns correct endpoint nested in TopicGroup', () => {
    const input = 'name1'
    const output = 'endpoint1'

    const result = searchForEndpoint(input);

    expect(result).toBe(output);
  });
  it('returns search when input is search', () => {
    const input = 'search'
    const output = 'search'

    const result = searchForEndpoint(input);

    expect(result).toBe(output);
  });
  it('throws error when it does not find anything', () => {
    const input = 'wrong'
    
    expect(() => searchForEndpoint(input)).toThrow('Undefined Topic'); ;
  });
})
import { TopicObject, topics } from '@/data/topics';

export function matchPath(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return topics.some((topicHead) => {
    if('name' in topicHead && typeof topicHead.name === 'string') return ('/' + topicHead.name) === normalizedPath;
    
    const topicCategory = Object.values(topicHead)[0];
    return topicCategory.some((topic: TopicObject) => ('/' + topic.name) === normalizedPath);
  });
}

export function humanizePath(pathname: string){
  return pathname.replace(/_/g, ' ');
}

export function searchForEndpoint(topicName: string): string | undefined{
  return topics.map(topicHead => {
    // Case 1: Topic is a simple object with name and endpoint
    if ('name' in topicHead && typeof topicHead.name === 'string') {
      return topicHead.name === topicName ? topicHead.endpoint : undefined;
    }

    // Case 2: Topic is inside a category object (array of TopicObject)
    const topicCategory = Object.values(topicHead)[0];
    const foundTopic = topicCategory.find((topic: TopicObject) => topic.name === topicName);
    return foundTopic ? foundTopic.endpoint : undefined;
  }).find(endpoint => endpoint !== undefined);
}
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

export function searchForEndpoint(topicName: string): string{
  const topicEndpoint = topics.map(topicHead => {
    if ('name' in topicHead && 'endpoint' in topicHead &&  typeof topicHead.name === 'string' && typeof topicHead.endpoint === 'string') {
      return topicHead.name === topicName ? topicHead.endpoint : undefined;
    }

    const topicCategory: TopicObject[] = Object.values(topicHead)[0];
    const foundTopic = topicCategory.find((topic) => topic.name === topicName);
    return foundTopic ? foundTopic.endpoint : undefined;
  }).find(endpoint => endpoint !== undefined);
  
  if(!topicEndpoint) throw Error('Undefined Topic');
  return topicEndpoint;
}
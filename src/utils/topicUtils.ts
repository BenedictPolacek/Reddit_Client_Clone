import { TopicHead, TopicObject, topics, TopicsGroup } from '@/data/topics';

export function isTopicGroup(topicHead: TopicHead): topicHead is TopicsGroup {
  return Array.isArray(Object.values(topicHead)[0]);
}

export function matchPath(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if(normalizedPath === '/search') return true;
  return topics.some((topicHead) => {
    if(isTopicGroup(topicHead)){
      const topicCategory = Object.values(topicHead)[0];
      return topicCategory.some((topic: TopicObject) => ('/' + topic.name) === normalizedPath);
    }
    return ('/' + topicHead.name) === normalizedPath;
  });
}

export function humanizePath(pathname: string){
  return pathname.replace(/_/g, ' ');
}

export function searchForEndpoint(topicName: string): string{
  const topicEndpoint = topics.map(topicHead => {
    if(isTopicGroup(topicHead)){
      const topicCategory: TopicObject[] = Object.values(topicHead)[0];
      const foundTopic = topicCategory.find((topic) => topic.name === topicName);
      return foundTopic ? foundTopic.endpoint : undefined;
    }
    return topicHead.name === topicName ? topicHead.endpoint : undefined; 
  }).find(endpoint => endpoint !== undefined);

  if(!topicEndpoint && topicName !== 'search') throw Error('Undefined Topic');
  return topicEndpoint ? topicEndpoint : topicName;
}

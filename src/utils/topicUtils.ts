import { TopicObject, topics } from '@/data/topics';

export function matchPath(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return topics.some((topicHead) => {
    if('name' in topicHead && typeof topicHead.name === 'string') return ('/' + topicHead.name) === normalizedPath;

    return Object.values(topicHead)[0].some((topic: TopicObject) => ('/' + topic.name) === normalizedPath);
  });
}

export function humanizePath(pathname: string){
    return pathname.replace(/_/g, ' ');
}
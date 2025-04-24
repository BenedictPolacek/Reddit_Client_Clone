import { topics } from '@/data/topics';

export function matchPath(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return topics.some((topic) => {
    if (typeof topic === 'object') {
      return Object.values(topic)[0].some(
        (nested) => ('/' + lowerSnakeCase(nested)) === normalizedPath
      );
    }
    return ('/' + lowerSnakeCase(topic)) === normalizedPath;
  });
}
export function lowerSnakeCase(string: string){
  return string.toLowerCase().replace(/\s+/g, '_');
}
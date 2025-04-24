import { topics } from '@/data/topics';

export function matchPath(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return topics.some((topic) => {
    if (typeof topic === 'object') {
      return Object.values(topic)[0].some(
        (nested) => ('/' + toLowerSnakeCase(nested)) === normalizedPath
      );
    }
    return ('/' + toLowerSnakeCase(topic)) === normalizedPath;
  });
}
export function toLowerSnakeCase(string: string){
  return string.toLowerCase().replace(/\s+/g, '_');
}
export function toUpperSpaceCase(string: string){
  return string
    .slice(1) // remove the first character
    .split('_') // split by underscores
    .map(word =>
      word
        .replace(/^./, c => c.toUpperCase()) // capitalize first letter
        .replace(/&([a-z])/g, (_, char) => '&' + char.toUpperCase()) // capitalize letter after '&'
    )
    .join(' ');
}
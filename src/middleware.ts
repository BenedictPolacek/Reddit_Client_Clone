import { NextRequest, NextResponse } from 'next/server';
import { matchPath } from './utils/topicUtils';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!matchPath(pathname)) {
    return NextResponse.redirect(new URL('/Popular', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'], // Match everything
};
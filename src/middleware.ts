import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveSiteFromHostname } from '@/config/sites';

export const SITE_ID_HEADER = 'x-site-id';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost';

  // Skip middleware for studio, API routes, static files
  if (
    request.nextUrl.pathname.startsWith('/studio') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Resolve site from hostname
  const site = resolveSiteFromHostname(hostname);

  // Add site ID to headers for use in server components
  // All sites now use the shared dataset (western-lng)
  const response = NextResponse.next();
  response.headers.set(SITE_ID_HEADER, site.id);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
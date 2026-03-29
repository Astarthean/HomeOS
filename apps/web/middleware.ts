import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']
const DASHBOARD_PREFIX = ['/dashboard', '/finanzas', '/compras']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  const isPublicRoute = PUBLIC_ROUTES.some(r => pathname === r)
  const isDashboardRoute = DASHBOARD_PREFIX.some(r => pathname === r || pathname.startsWith(r + '/'))

  // Redirect to dashboard if already logged in and going to login/register
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect to login if not logged in and going to a protected route
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}

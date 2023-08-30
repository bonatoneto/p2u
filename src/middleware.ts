import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('p2u-token')?.value
  const signInURL = new URL('/login/', request.url)
  const dashboardURL = new URL('/dashboard/', request.url)
  
  if (request.nextUrl.pathname.startsWith('/dashboard') && token === undefined) {
    return NextResponse.redirect(signInURL)
  } else if (request.nextUrl.pathname === '/login/' && token != undefined) {
    return NextResponse.redirect(dashboardURL)
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/login/',
    '/dashboard/:path*'
  ]
}
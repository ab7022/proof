// app/middleware.js
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request:NextRequest) {
  const token = await getToken({ req: request });

  // Redirect to home if not authenticated and accessing a protected route
  if (!token && request.nextUrl.pathname === '/Check') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/Check'], // Apply middleware to the Check route
};

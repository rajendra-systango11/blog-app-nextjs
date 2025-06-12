// middleware.ts
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes are public
const PUBLIC_PATHS = ["/", "/login", "/api", "/_next", "/favicon.ico"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow public paths
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!token && !isPublic) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default withAuth({
  pages: {
    signIn: '/login', // Redirect unauthenticated users to this page
  },
});

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'], // ✅ matcher goes here
};
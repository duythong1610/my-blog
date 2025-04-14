import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedRoutes = [
    pathname.startsWith("/viet-bai"),
    pathname.startsWith("/account"),
  ];

  if (protectedRoutes.some(Boolean) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/viet-bai", "/login", "/register"],
};

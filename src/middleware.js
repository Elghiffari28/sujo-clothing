import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  // console.log("MIDDLEWARE KEPAKE:", req.nextUrl.pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // cek kalau akses ke /admin tapi belum login
  if (pathname.startsWith("/admin")) {
    const isAdmin = req.cookies.get("isAdmin")?.value;
    if (isAdmin !== "true") {
      // console.log("REDIRECT KE LOGIN");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Proteksi semua route di /dashboard
};

import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const adminId = process.env.ADMIN_ID;
console.log("Admin ID:", adminId);

const loggedInRoutes = [
  "/ka/dashboard",
  "/ka/admin",
  "/en/admin",
  "/en/dashboard",
];
const adminRoutes = ["/ka/admin", "/en/admin"];
const loggedOutRoutes = ["/login", "/register"];
const publicRoutes = [
  "/ka/shop",
  "/en/shop",
  "/ka/blog",
  "/en/blog",
  "/ka/contact",
  "/en/contact",
];

const I18nMiddleware = createI18nMiddleware({
  locales: ["ka", "en"],
  defaultLocale: "en",
});

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    console.log("Applying i18n middleware for public route", pathname);
    return I18nMiddleware(req);
  }

  const token = await getToken({ req, secret });

  if (pathname === "/") {
    console.log("Redirecting root path '/' to '/ka'");
    return NextResponse.redirect(new URL("/ka", req.url));
  }

  if (pathname === "/ka" || pathname === "/en") {
    console.log("Applying i18n middleware for", pathname);
    return I18nMiddleware(req);
  }

  const i18nResponse = I18nMiddleware(req);
  if (i18nResponse.headers.get("x-next-locale")) {
    req.headers.set(
      "x-next-locale",
      i18nResponse.headers.get("x-next-locale") || "ka"
    );
  }

  if (loggedInRoutes.some((path) => pathname.startsWith(path)) && !token) {
    console.log(
      "User not authenticated for loggedInRoutes, redirecting to login"
    );
    return NextResponse.redirect(
      new URL(`/${req.headers.get("x-next-locale") || "ka"}/login`, req.url)
    );
  }

  if (token) {
    if (loggedOutRoutes.some((path) => pathname.startsWith(path))) {
      console.log(
        "Redirecting to dashboard for authenticated user on loggedOutRoutes"
      );
      return NextResponse.redirect(
        new URL(
          `/${req.headers.get("x-next-locale") || "ka"}/dashboard`,
          req.url
        )
      );
    }

    if (adminRoutes.some((path) => pathname.startsWith(path))) {
      if (String(token.sub) === String(adminId)) {
        console.log("Admin access granted");
        return NextResponse.next();
      } else {
        console.log(
          "User not authorized for adminRoutes, redirecting to dashboard"
        );
        return NextResponse.redirect(
          new URL(
            `/${req.headers.get("x-next-locale") || "ka"}/dashboard`,
            req.url
          )
        );
      }
    }

    if (loggedInRoutes.some((path) => pathname.startsWith(path))) {
      console.log("Access granted to loggedInRoutes");
      return NextResponse.next();
    }
  }

  if (
    pathname === "/ka/dashboard" ||
    pathname === "/en/dashboard" ||
    pathname === "/en/admin" ||
    pathname === "/ka/admin"
  ) {
    const redirectUrl = new URL(
      `/${req.headers.get("x-next-locale") || "ka"}/login`,
      req.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/",
    "/ka",
    "/en",
    "/ka/shop",
    "/en/shop",
    "/ka/blog",
    "/en/blog",
    "/ka/contact",
    "/en/contact",
  ],
};

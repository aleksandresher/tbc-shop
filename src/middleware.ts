import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const adminId = process.env.ADMIN_ID;

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
    return I18nMiddleware(req);
  }

  const token = await getToken({ req, secret });

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ka", req.url));
  }

  if (pathname === "/ka" || pathname === "/en") {
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
    return NextResponse.redirect(
      new URL(`/${req.headers.get("x-next-locale") || "ka"}/login`, req.url)
    );
  }

  if (token) {
    if (loggedOutRoutes.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(
        new URL(
          `/${req.headers.get("x-next-locale") || "ka"}/dashboard`,
          req.url
        )
      );
    }

    if (adminRoutes.some((path) => pathname.startsWith(path))) {
      if (String(token.sub) === String(adminId)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL(
            `/${req.headers.get("x-next-locale") || "ka"}/dashboard`,
            req.url
          )
        );
      }
    }

    if (loggedInRoutes.some((path) => pathname.startsWith(path))) {
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

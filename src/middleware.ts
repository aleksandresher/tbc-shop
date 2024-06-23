import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const loggedInRoutes = ["/dashboard"];
const loggedOutRoutes = ["/login", "/register"];

const I18nMiddleware = createI18nMiddleware({
  locales: ["ka", "en"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ka", request.url));
  }

  if (pathname === "/ka") {
    return I18nMiddleware(request);
  }

  const i18nResponse = I18nMiddleware(request);
  if (i18nResponse.headers.get("x-next-locale")) {
    request.headers.set(
      "x-next-locale",
      i18nResponse.headers.get("x-next-locale") || "ka"
    );
  }

  const myCookie = cookies();
  const token = myCookie.get("token")?.value || null;

  if (loggedInRoutes.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(
      `/${request.headers.get("x-next-locale")}/login`
    );
  }

  if (loggedOutRoutes.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect("/dashboard");
  }

  if (pathname === "/ka/dashboard" || pathname === "/en/dashboard") {
    const localePrefix = request.headers.get("x-next-locale") || "ka";

    const urlObject = new URL(request.url);

    const redirectUrl = new URL(`/${localePrefix}/login`, urlObject.origin);

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

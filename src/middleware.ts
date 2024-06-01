import { createI18nMiddleware } from "next-international/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "ka"],
  defaultLocale: "ka",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export default withAuth({
  pages: {
    signIn: "ka/login",
  },
});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};

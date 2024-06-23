import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const loggedInRoutes = ["ka/dashboard", "ka/admin", "en/admin", "en/dashboard"];
const loggedOutRoutes = ["/login", "/register", "/ka/admin", "/en/admin"];

const I18nMiddleware = createI18nMiddleware({
  locales: ["ka", "en"],
  defaultLocale: "en",
});

export async function middleware(req: NextRequest): Promise<NextResponse> {
  // const token = await getToken({ req, secret });
  const url = req.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ka", req.url));
  }

  if (pathname === "/ka") {
    return I18nMiddleware(req);
  }

  const i18nResponse = I18nMiddleware(req);
  if (i18nResponse.headers.get("x-next-locale")) {
    req.headers.set(
      "x-next-locale",
      i18nResponse.headers.get("x-next-locale") || "ka"
    );
  }

  const myCookie = cookies();
  const token = myCookie.get("next-auth.session-token")?.value;
  // const token = myCookie.get("token")?.value || null;
  if (token) {
    if (loggedInRoutes.some((path) => pathname.startsWith(path)) && !token) {
      console.log("pathname", pathname);
      return NextResponse.redirect(`http://localhost:3000/ka/login`);
    }
  }

  if (token) {
    if (loggedOutRoutes.some((path) => pathname.startsWith(path)) && token) {
      return NextResponse.redirect("http//localhost:3000/k/dashboard");
    }
  }

  if (
    pathname === "/dashboard" ||
    pathname === "/dashboard" ||
    pathname === "/admin" ||
    pathname === "/admin"
  ) {
    console.log("here i am");
    const localePrefix = req.headers.get("x-next-locale") || "ka";

    const urlObject = new URL(req.url);

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

// import { createI18nMiddleware } from "next-international/middleware";
// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { getToken } from "next-auth/jwt";

// const secret = process.env.NEXTAUTH_SECRET;

// const loggedInRoutes = ["/dashboard"];
// const adminRoutes = ["/admin"]; // Define admin routes
// const loggedOutRoutes = ["/login", "/register"];

// const I18nMiddleware = createI18nMiddleware({
//   locales: ["ka", "en"],
//   defaultLocale: "en",
// });

// export async function middleware(req: NextRequest): Promise<NextResponse> {
//   console.log("Starting middleware execution");

//   const token = await getToken({ req, secret });
//   console.log("Token:", token);

//   const url = req.nextUrl.clone();
//   const { pathname } = url;
//   console.log("Request pathname:", pathname);

//   // Redirect root path '/' to '/ka'
//   if (pathname === "/") {
//     console.log("Redirecting root path '/' to '/ka'");
//     return NextResponse.redirect(new URL("/ka", req.url));
//   }

//   // Apply i18n middleware for '/ka' and '/en' paths
//   if (pathname === "/ka" || pathname === "/en") {
//     console.log("Applying i18n middleware for", pathname);
//     return I18nMiddleware(req);
//   }

//   // Apply i18n middleware and continue the chain
//   console.log("Applying i18n middleware and continuing chain");
//   const i18nResponse = I18nMiddleware(req);
//   if (i18nResponse.headers.get("x-next-locale")) {
//     req.headers.set(
//       "x-next-locale",
//       i18nResponse.headers.get("x-next-locale") || "ka"
//     );
//   }

//   // Check authentication based on routes
//   const myCookie = cookies();
//   console.log("Cookies:", myCookie);

//   if (token) {
//     // User is authenticated
//     if (loggedInRoutes.some((path) => pathname.startsWith(path))) {
//       // Redirect to login if accessing a logged-in route without a token id
//       if (!token.id) {
//         console.log("Redirecting to login because user is not authenticated");
//         return NextResponse.redirect(
//           `/${req.headers.get("x-next-locale")}/login`
//         );
//       }
//     }

//     // Check if the user has admin privileges
//     if (
//       adminRoutes.some((path) =>
//         pathname.startsWith(`/${req.headers.get("x-next-locale")}${path}`)
//       )
//     ) {
//       // Redirect to dashboard if accessing an admin route with token id
//       if (token.id) {
//         console.log("Redirecting to dashboard for admin");
//         return NextResponse.redirect("/dashboard");
//       }
//     }
//   } else {
//     // User is not authenticated
//     if (loggedOutRoutes.some((path) => pathname.startsWith(path))) {
//       // Redirect to dashboard if accessing a logged-out route with token id
//       console.log("Redirecting to dashboard for logged out user");
//       return NextResponse.redirect("/dashboard");
//     }
//   }

//   // Handle specific redirects based on paths
//   if (
//     pathname === "/ka/dashboard" ||
//     pathname === "/en/dashboard" ||
//     pathname === "/en/admin" ||
//     pathname === "/ka/admin"
//   ) {
//     console.log("Handling specific redirect:", pathname);
//     const localePrefix = req.headers.get("x-next-locale") || "ka";
//     const redirectUrl = new URL(`/${localePrefix}/login`, url.origin);
//     return NextResponse.redirect(redirectUrl);
//   }

//   // If no conditions match, proceed to the next response
//   console.log("Proceeding to next response");
//   return NextResponse.next();
// }

// // Configure middleware to exclude specific paths
// export const config = {
//   matcher: [
//     "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
//     "/", // Root path
//     "/ka", // '/ka' path
//     "/en", // '/en' path
//     "/ka/shop", // '/ka/shop' path
//     "/en/shop", // '/en/shop' path
//     "/ka/blog", // '/ka/blog' path
//     "/en/blog", // '/en/blog' path
//     "/ka/contact", // '/ka/contact' path
//     "/en/contact", // '/en/contact' path
//   ],
// };

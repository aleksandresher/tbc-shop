// export const I18nMiddleware = {
//   locales: ["en", "ka"],
//   defaultLocale: "ka",
// };

// const getLocaleFromPath = (pathname: string) => {
//   const localeFromPathRegex = new RegExp(
//     `^/(${I18nMiddleware.locales.join("|")})?`
//   );
//   const localeFromPath = pathname.match(localeFromPathRegex)?.[1];
//   return {
//     locale: localeFromPath,
//     path: localeFromPath ? `/${localeFromPath}` : "",
//   };
// };

// const checkCurrentRoute = (pathname: string, locale?: string) => {
//   const checkPathnameRegex = (pattern: string | RegExp) => {
//     const rootRegex = new RegExp(pattern);
//     return Boolean(pathname.match(rootRegex));
//   };

//   return {
//     root: checkPathnameRegex(`^/(${locale})?$`),
//     dashboard: checkPathnameRegex(`^(/${locale})?/dashboard.*`),
//     login: checkPathnameRegex(`^(/${locale})?/login.*`),
//   };
// };

// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       const { nextUrl } = request;

//       const locale = getLocaleFromPath(nextUrl.pathname);
//       const dashboardUrl = new URL(`${locale.path}/dashboard`, nextUrl);

//       const {
//         root: isOnRoot,
//         dashboard: isOnDashboard,
//         login: isOnLogin,
//       } = checkCurrentRoute(nextUrl.pathname, locale.locale);

//       const isLoggedIn = !!auth?.user;

//       if (isOnRoot || (isLoggedIn && !isOnDashboard)) {
//         // If on root or logged in but not on dashboard, redirect to dashboard
//         return Response.redirect(dashboardUrl);
//       }

//       if ((isOnLogin && !isLoggedIn) || (isOnDashboard && isLoggedIn)) {
//         // Not logged in but on login OR logged in and on dashboard => allow access
//         return I18nMiddleware(request, i18nConfig);
//       }

//       // Not logged in and not on login or dashboard => redirect to login page
//       return false;
//     },
//   },

//   providers: [],
// } satisfies NextAuthConfig;

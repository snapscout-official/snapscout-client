import { auth } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //auth type of middleware
  if (isLoggedIn) {
    if (isAuthRoute) {
      return Response.redirect(new URL(AGENCY_DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  //guest type of middleware
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

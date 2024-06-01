import { auth } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  DEFAULT_REGISTER_ROUTE,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(req.auth);
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //auth type of middleware
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(AGENCY_DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  //guest type of middleware
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REGISTER_ROUTE, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

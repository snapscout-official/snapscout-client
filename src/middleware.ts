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
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const forbidden = !isPublicRoute && !isLoggedIn;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AGENCY_DEFAULT_LOGIN_REDIRECT));
    }
    return null;
  }
  if (forbidden) {
    return Response.redirect(new URL(DEFAULT_REGISTER_ROUTE));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { auth } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  authRoutes,
  publicRoutes,
} from "@/routes";
export default auth((req, _) => {
  const isLoggedIn = req.auth?.apiToken;
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //auth type of middleware
  if (isLoggedIn) {
    if (isAuthRoute) {
      return Response.redirect(new URL(AGENCY_DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
  //guest type of middleware
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { getCurrentUserRole, isAuthenticated } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  MERCHANT_DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
export function middleware(req: NextRequest) {
  const isLoggedIn = isAuthenticated(req);
  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isMerchantRoute = nextUrl.pathname.startsWith("/merchant");
  const headers = new Headers(req.headers);
  const role = "Agency";
  headers.set("x-current-path", nextUrl.pathname);
  //auth type of middleware

  //planning to refactor this. but for now i fck with dis
  if (isLoggedIn) {
    const role = getCurrentUserRole();

    if (
      (isAuthRoute && role == "Agency") ||
      (isMerchantRoute && role == "Agency")
    )
      return Response.redirect(new URL(AGENCY_DEFAULT_LOGIN_REDIRECT, nextUrl));
    else if (isAuthRoute && role == "Merchant")
      return Response.redirect(
        new URL(MERCHANT_DEFAULT_LOGIN_REDIRECT, nextUrl),
      );
    return NextResponse.next({ request: { headers: headers } });
  }
  //redirect user when not authenticated and accesing public routes
  if (!isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
  }
  //nextjs server actions returns undefined when doing the one below
  /* return NextResponse.next({ headers}); */

  //this fixed the problem
  return NextResponse.next({ request: { headers: headers } });
}

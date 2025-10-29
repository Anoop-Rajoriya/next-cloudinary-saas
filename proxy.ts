// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Routes that require authenticaitn (User only)
const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/api/protected/(.*)",
]);
// 2. Routes that should not be accessible when authenticated (Public only)
const isPublicOnlyRoute = createRouteMatcher([
  "/auth/sign-in",
  "/auth/sign-up",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 1. Protect user only routes

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // 2. Protect public only routes
  if (userId && isPublicOnlyRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

import {
  clerkMiddleware,
  createRouteMatcher
} from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',

]);

const isPublicRoute = createRouteMatcher([
  '/api/webhook',
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are protected (require authentication)
// Note: Category and scenario detail pages are PUBLIC for browsing
// Only actual session/voice pages require login
const isProtectedRoute = createRouteMatcher([
  "/studio/session(.*)",  // Text sessions require login
  "/studio/voice(.*)",    // Voice sessions require login
]);

// Main studio dashboard requires auth (has user-specific data)
const isStudioDashboard = createRouteMatcher([
  "/studio",              // Exact match for dashboard
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect session and voice routes (actual training)
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // Studio dashboard also requires auth (shows user progress, stats)
  if (isStudioDashboard(req) && req.nextUrl.pathname === "/studio") {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

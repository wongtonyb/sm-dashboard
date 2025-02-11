// The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.
// https://clerk.com/docs/references/nextjs/clerk-middleware

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './lib/settings'
import { NextResponse } from 'next/server'

const matchers = Object.keys(routeAccessMap).map((route) => ({
   matcher: createRouteMatcher([route]),
   allowedRoles: routeAccessMap[route],
}))

// console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
   const { sessionClaims } = await auth()
   // console.log(sessionClaims);

   // simply grabbing role
   // describe metadata type as object with optional role, needed to ts type safety
   const role = (sessionClaims?.metadata as { role?: string })?.role

   for (const { matcher, allowedRoles } of matchers) {
      //if req in matcher, and role not part of the allowedRoles[]
      if (matcher(req) && !allowedRoles.includes(role!)) {
         //aka, if not allowed, redirect to /${role}
         return NextResponse.redirect(new URL(`/${role}`, req.url))
      }
   }
})

export const config = {
   matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
   ],
}

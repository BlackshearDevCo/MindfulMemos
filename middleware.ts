import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";
import { getIsUnauthenticatedRoute, getLoginRoute } from "@/lib/routes";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data } = await supabase.auth.getSession();

  const unauthenticatedRoute = getIsUnauthenticatedRoute(req.url);

  if (!data.session?.user && !unauthenticatedRoute)
    return NextResponse.redirect(new URL(getLoginRoute(), req.url));

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

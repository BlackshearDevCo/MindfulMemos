import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { getLoginRoute } from "./lib/routes";

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session?.user?.sid)
    NextResponse.redirect(new URL(getLoginRoute(), req.url));

  return res;
});

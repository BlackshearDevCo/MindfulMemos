import {
  getSession,
  updateSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getLoginRoute } from "./lib/routes";

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (!session?.user?.sid) {
    NextResponse.redirect(new URL(getLoginRoute(), req.url));
    return;
  }

  const payload = {
    userId: session?.user?.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) throw new Error("Missing JWT Secret");
  const encodedSecret = new TextEncoder().encode(secret);
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedSecret);

  await updateSession(req, res, {
    ...session,
    user: { ...session.user, accessToken: jwt },
  });

  return res;
});

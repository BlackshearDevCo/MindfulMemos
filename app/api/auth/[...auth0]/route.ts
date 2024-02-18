// import { Session, handleAuth, handleCallback } from "@auth0/nextjs-auth0";
// import { SignJWT } from "jose";

import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
});

// const afterCallback = async (req: any, res: any, session: Session) => {
//   const payload = {
//     userId: session?.user?.sub,
//     exp: Math.floor(Date.now() / 1000) + 60 * 60,
//   };

//   const secret = process.env.SUPABASE_JWT_SECRET;

//   if (!secret) throw new Error("Missing JWT Secret");
//   const encodedSecret = new TextEncoder().encode(secret);
//   const jwt = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("1h")
//     .sign(encodedSecret);

//   // session.user.accessToken = jwt;
//   const updatedSession = {
//     ...session,
//     user: { ...session.user, accessToken: jwt },
//   };

//   console.log({ updatedSession });

//   return updatedSession;
// };

// export const GET = handleAuth({
//   async callback(req: any, ctx: any) {
//     try {
//       return await handleCallback(req, ctx, { afterCallback });
//     } catch (error: any) {
//       return new Response(error.message, {
//         status: error.status || 500,
//       });
//     }
//   },
// });

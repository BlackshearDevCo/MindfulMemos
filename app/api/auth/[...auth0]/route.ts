import auth0 from "@/lib/auth0";
import { handleLogin } from "@auth0/nextjs-auth0";

export const GET = auth0.handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
});

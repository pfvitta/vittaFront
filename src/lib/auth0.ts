import { Auth0Client, filterDefaultIdTokenClaims } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';

export const auth0 = new Auth0Client({
  // ✅ Hook que filtra claims y mantiene el rol
  async beforeSessionSaved(session, idToken) {
    return {
      ...session,
      user: {
        ...filterDefaultIdTokenClaims(session.user),
        role: session.user["https://vitta.com/roles"], // claim personalizado
      },
    };
  },

  // ✅ Redirección después del login
  async onCallback(error, context, session) {
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
      );
    }

    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL)
    );
  },

  session: {
    rolling: true,
    absoluteDuration: 60 * 60 * 24 * 30,
    inactivityDuration: 60 * 60 * 24 * 7,
  },

  authorizationParameters: {
    scope: "openid profile email",
     audience: "https://dev-q0aqr87w7eu1wqet.us.auth0.com/api/v2/",
  },

  appBaseUrl: process.env.APP_BASE_URL,
});


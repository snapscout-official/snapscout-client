import NextAuth, { Session } from "next-auth";
import { decodeJwt } from "jose";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { authenticate, destroyApiToken } from "./app/actions/authentication";
import { cookies } from "next/headers";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        password: { type: "password" },
        email: { type: "email" },
        role: { type: "text" },
      },
      async authorize(credentials) {
        try {
          if (typeof credentials === "undefined") {
            throw new Error("No credentials acquired");
          }
          const res = await authenticate(
            credentials?.email,
            credentials?.password,
            credentials?.role,
          );
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          return { ...data.user, apiToken: data.token };
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          const JwtToken = {
            ...user,
            ...token,
          };
          return JwtToken;
        }
        return token;
      } catch (err) {
        throw err;
      }
    },
    async session({ token, session }) {
      const tokenHasNotExpired = getIsValidToken(token.apiToken);
      if (!tokenHasNotExpired) {
        const sessionData: Session = {
          user: undefined,
          apiToken: null,
          expires: null,
        };
        return sessionData;
      }
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (c !== "iat" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});

      const data = {
        ...session,
        user: sanitizedToken,
        apiToken: token.apiToken,
      };
      return data;
    },
  },
  events: {
    async signOut({ session, token }) {
      //event that calls signout endpoint
      await destroyApiToken(token.apiToken);
    },
    // async signIn({ user }) {
    //   const result = await setCartCookie(null, user.apiToken);
    //   console.log(result);
    // },
  },
});

//checks wether the apitoken is not expired
function getIsValidToken(token: string) {
  if (!token) {
    return false;
  }
  const parsedJWT = parseJWT(token);
  const JWTExpirationDate = new Date(parsedJWT.exp * 1000);
  if (JWTExpirationDate < new Date()) {
    return false;
  }
  return true;
}
//functio that will parse the api token
function parseJWT(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    console.log(err);
  }
}

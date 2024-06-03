import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { authenticate } from "./app/actions/authentication";
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
      async authorize(credentials) {
        try {
          if (typeof credentials === "undefined") {
            throw new Error("No credentials acquired");
          }
          const res = await authenticate(
            credentials?.email,
            credentials?.password,
          );
          if (!res.ok) {
            throw new Error("fetch login error");
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
      if (user) {
        const JwtToken = {
          ...user,
          ...token,
        };
        return JwtToken;
      }
      return token;
    },
    async session({ token, session }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
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
});

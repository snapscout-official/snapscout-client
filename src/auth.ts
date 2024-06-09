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
            const data = await res.json();
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          return { ...data.user, apiToken: data.token };
        } catch (err) {
          throw err;
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

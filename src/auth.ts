import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { authenticate } from "./services/authService";
import Credentials from "next-auth/providers/credentials";
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
      name: "snapscout-auth-service",
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
          throw err;
        }
      },
    }),
  ],
});

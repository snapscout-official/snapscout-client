import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import NextAuth from "next-auth/next";
import { authenticate } from "./services/authService";
interface CredentialsInterface {
  email: string;
  password: string;
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          await authenticate(credentials?.email, credentials?.password);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
});

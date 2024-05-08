import { authenticate } from '@/services/authService';
import type { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          const res = await authenticate(
            credentials?.email,
            credentials?.password
          );
          if (res) {
            const data = { ...res.user, apiToken: res.token };
            return data;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== 'iat' && c !== 'exp' && c !== 'jti' && c !== 'apiToken') {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        const userJWT: JWT = {
          ...user,
        };
        return userJWT;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

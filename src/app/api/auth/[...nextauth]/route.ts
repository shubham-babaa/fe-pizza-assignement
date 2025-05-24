// app/api/auth/[...nextauth]/route.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth/next";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",

      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  pages: {
    signIn: "/",
    error: "/error", // Must match actual error page path
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
import NextAuth, { type NextAuthOptions } from "next-auth"
import prisma from "../../../lib/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import ZohoProvider from "next-auth/providers/zoho"
import GithubProvider from "next-auth/providers/github"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET)
  throw new Error("Failed to initialize Github authentication")

// !!! To be investigated: Zoho authentication is not working atm !!!!

// if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET)
//   throw new Error("Failed to initialize Zoho authentication")

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.name,
      },
    }),
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".vercel.app" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    signIn: `/platform/login`,
    verifyRequest: `/platform/login`,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ZohoProvider({
    //   clientId: process.env.ZOHO_CLIENT_ID,
    //   clientSecret: process.env.ZOHO_CLIENT_SECRET,
    // }),
  ],
}

export default NextAuth(authOptions)

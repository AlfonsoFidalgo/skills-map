import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profile(profile: any) {
        console.log("LinkedIn profile:", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          linkedInId: profile.sub,
        };
      },
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with the same email
    }),
  ],
  session: {
    strategy: "database", // Use database sessions with Prisma
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: any) {
      // With database sessions, user data comes from the database
      if (session.user && user) {
        session.user.id = user.id;
        session.user.linkedInId = user.linkedInId;
      }
      return session;
    },
  },
});

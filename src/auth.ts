import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for stateless sessions (no database)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add LinkedIn user data to the token
      if (account && profile) {
        token.id = account.providerAccountId;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      session.user.id = token.id as string;
      return session;
    },
  },
});

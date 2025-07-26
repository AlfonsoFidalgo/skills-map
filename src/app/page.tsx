"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/actions/auth";

export default function Home() {
  const session = useSession();
  let authContent: React.ReactNode;
  console.log("Session:", session);
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <div>Welcome, {session.data.user.name}!</div>
        <form action={signOut} method="post">
          <button type="submit">Sign out</button>
        </form>
      </>
    );
  } else {
    authContent = (
      <div>
        Please sign in to continue.
        <form action={signIn} method="post">
          <button type="submit">Sign in with LinkedIn</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>{authContent}</div>
    </div>
  );
}

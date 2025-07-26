"use server";

import * as auth from "../auth";

export async function signIn() {
  return auth.signIn("linkedin");
}

export async function signOut() {
  return auth.signOut();
}

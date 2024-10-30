
"use client"; 

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      
      <h1>This is the beginning of something new</h1>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/Check" });
        }}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => {
          signIn("github", { callbackUrl: "/Check" });
        }}
      >
        Sign in with Github
      </button>
    </div>
  );
}

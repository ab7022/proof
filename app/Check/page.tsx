// app/Check/page.js
"use client"; // Make this component client-side

import { signOut } from "next-auth/react";
import React from "react";

export default function Check() {
  return (
    <div>
      <h1>You are signed in</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

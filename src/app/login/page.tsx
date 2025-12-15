"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4">

        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Email Login */}
        <input
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border px-4 py-2 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/tasks",
            })
          }
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-500">OR</div>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/tasks" })}
          className="w-full px-6 py-3 border rounded-lg font-semibold"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🐝 Brand */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          🐝 taskBee
        </Link>

        {/* Right side */}
        {status === "loading" ? null : session ? (
          <div className="flex items-center gap-4">

            {/* User email badge */}
            <span className="hidden sm:block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {session.user?.email}
            </span>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-black hover:scale-105 transition-all shadow-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 hover:scale-105 transition-all shadow-md"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

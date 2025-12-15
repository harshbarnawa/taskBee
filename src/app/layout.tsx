"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />   {/* 👈 GLOBAL */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

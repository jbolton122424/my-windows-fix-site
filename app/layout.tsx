import Link from "next/link";
import { fixes } from "./fixes";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load Google fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the whole site
export const metadata: Metadata = {
  title: "My Windows Fix Site",
  description: "Step-by-step guides to fix Windows error codes",
  verification: {
    google: "oZ1Vt2noUR6m93KadfbG3-Oqnl7fwaWmDLjRdRkQ85E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation */}
        <nav style={{ padding: "20px", background: "#eee", marginBottom: "20px" }}>
          <Link href="/" style={{ marginRight: "20px" }}>
            Home
          </Link>

          {fixes.map((fix) => (
            <Link
              key={fix.slug}
              href={`/fix/${fix.slug}`}
              style={{ marginRight: "20px" }}
            >
              {fix.title}
            </Link>
          ))}
        </nav>

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}

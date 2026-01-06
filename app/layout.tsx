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
    google: "oZ1Vt2noUR6m93KadfbG3-Oqnl7fwaWmDLjRdRkQ85E", // <-- your Google Search Console token
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

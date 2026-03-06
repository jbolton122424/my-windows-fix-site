import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixerrorhelp.com"),
  title: {
    default: "Fix Error Help",
    template: "%s | Fix Error Help",
  },
  description:
    "Step-by-step Windows error fix guides for update errors, install problems, activation issues, and command-based repairs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fix Error Help",
    description:
      "Step-by-step Windows error fix guides for update errors, install problems, activation issues, and command-based repairs.",
    url: "https://fixerrorhelp.com",
    siteName: "Fix Error Help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix Error Help",
    description:
      "Step-by-step Windows error fix guides for update errors, install problems, activation issues, and command-based repairs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fix Error Help",
    url: "https://fixerrorhelp.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fixerrorhelp.com/fix/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
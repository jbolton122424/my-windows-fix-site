import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://fixerrorhelp.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Fix Error Help | Windows Error Code Fix Guides",
    template: "%s | Fix Error Help",
  },

  description:
    "Step-by-step guides to fix Windows error codes, Windows Update failures, Microsoft Store errors, activation problems, and system repair issues.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Fix Error Help",
    title: "Fix Error Help | Windows Error Code Fix Guides",
    description:
      "Step-by-step guides to fix Windows error codes, Windows Update failures, Microsoft Store errors, activation problems, and system repair issues.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fix Error Help | Windows Error Code Fix Guides",
    description:
      "Step-by-step guides to fix Windows error codes, Windows Update failures, Microsoft Store errors, activation problems, and system repair issues.",
  },

  verification: {
    google: "NjBZS2PB1qcoglARmCA5siAPkEGKpgRjmIQyQdUbY8I",
  },
};

export default function RootLayout({ children }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fix Error Help",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
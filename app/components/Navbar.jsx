"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#111",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: "-0.02em",
          }}
        >
          Fix Error Help
        </Link>

        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "rgba(0,0,0,0.75)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Home
          </Link>

          <a
            href="https://fixerrorhelp.com/#all-guides"
            style={{
              textDecoration: "none",
              color: "rgba(0,0,0,0.75)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            All Guides
          </a>
        </nav>
      </div>
    </header>
  );
}
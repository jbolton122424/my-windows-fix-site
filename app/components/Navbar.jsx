"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#ffffff",
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
          style={{
            display: "flex",
            gap: 18,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
            }}
          >
            Home
          </Link>

          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
            }}
          >
            All Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}
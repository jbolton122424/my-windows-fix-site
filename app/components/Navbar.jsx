"use client";

import Link from "next/link";
import { useState } from "react";

function normalizeCode(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw.startsWith("0x")) return raw;
  return `0x${raw}`;
}

export default function Navbar() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const normalized = normalizeCode(query);
    if (!normalized) return;

    window.location.href = `/fix/${encodeURIComponent(normalized)}`;
  }

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
        >
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
              href="/#all-guides"
              style={{
                textDecoration: "none",
                color: "#111",
              }}
            >
              All Guides
            </Link>
          </nav>

          <form
            onSubmit={handleSubmit}
            role="search"
            aria-label="Search Windows error code"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search error code"
              aria-label="Search error code"
              style={{
                width: 180,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.14)",
                fontSize: 14,
                outline: "none",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.1)",
                background: "#111",
                color: "#fff",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
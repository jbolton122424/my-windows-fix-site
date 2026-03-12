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
  const [isFocused, setIsFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const normalized = normalizeCode(query);
    if (!normalized) return;

    window.location.href = `/fix/${encodeURIComponent(normalized)}`;
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              fontWeight: 900,
              fontSize: 19,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Fix Error Help
          </Link>

          <span
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,0.58)",
              lineHeight: 1.35,
            }}
          >
            Windows error code repair guides
          </span>
        </div>

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
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#111",
                fontWeight: 700,
                fontSize: 14,
                padding: "9px 12px",
                borderRadius: 10,
                lineHeight: 1,
              }}
            >
              Home
            </Link>

            <Link
              href="/#all-guides"
              style={{
                textDecoration: "none",
                color: "#111",
                fontWeight: 700,
                fontSize: 14,
                padding: "9px 12px",
                borderRadius: 10,
                lineHeight: 1,
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
              padding: 4,
              borderRadius: 14,
              background: "#f5f7fa",
              border: isFocused
                ? "1px solid rgba(17,17,17,0.22)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isFocused
                ? "0 0 0 3px rgba(17,17,17,0.08)"
                : "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search error code"
              aria-label="Search error code"
              style={{
                width: 200,
                padding: "11px 12px",
                borderRadius: 10,
                border: "none",
                background: "transparent",
                fontSize: 14,
                color: "#111",
                outline: "none",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "11px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#111",
                color: "#fff",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                lineHeight: 1,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
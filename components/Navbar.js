// components/Navbar.js
import Link from "next/link";
import { fixes } from "../app/fixes";

export default function Navbar() {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <nav className="container" style={{ paddingTop: 18, paddingBottom: 18 }}>
        {/* Top row: brand */}
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.01em",
              color: "rgba(0,0,0,0.92)",
              textDecoration: "none",
            }}
          >
            Windows Fix Guides
          </Link>
        </div>

        {/* Second row: links wrap instead of scrolling */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "rgba(0,0,0,0.78)",
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(0,0,0,0.03)",
              fontSize: 14,
            }}
          >
            Home
          </Link>

          {fixes.map((fix) => (
            <Link
              key={fix.slug}
              href={`/fix/${fix.slug}`}
              style={{
                textDecoration: "none",
                color: "rgba(0,0,0,0.78)",
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.10)",
                background: "rgba(0,0,0,0.03)",
                fontSize: 14,
              }}
            >
              {fix.slug}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

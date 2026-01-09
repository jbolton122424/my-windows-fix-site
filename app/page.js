// app/page.js
import Link from "next/link";
import { fixes } from "@/app/fixes";

export default function Home() {
  return (
    <main className="container prose">
      <h1>Windows Fix Guides</h1>

      <p>
        Step-by-step help for common Windows error codes. Click an error code
        below to see what it means and how to fix it.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
          marginTop: 18,
        }}
      >
        {fixes.map((fix) => (
          <Link
            key={fix.slug}
            href={`/fix/${fix.slug}`}
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {fix.slug}
            </div>

            <div style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.72)", lineHeight: 1.55 }}>
              {fix.description}
            </div>

            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700 }}>
              View fix →
            </div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <strong>Tip:</strong>
        <p style={{ marginTop: 8 }}>
          If you don’t see your error code yet, check back soon — we’re adding
          new guides regularly.
        </p>
      </div>
    </main>
  );
}

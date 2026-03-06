// app/page.js
import Link from "next/link";
import { fixes } from "@/app/fixes";

function stableHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickStable(list, seedStr, count) {
  const arr = Array.isArray(list) ? list.filter((x) => x?.slug) : [];
  if (!arr.length) return [];
  const seed = stableHash(seedStr);
  const out = [];

  for (let i = 0; i < arr.length && out.length < count; i += 1) {
    const idx = (seed + i * 2654435761) % arr.length;
    const item = arr[idx];
    if (item && item.slug && !out.some((x) => x.slug === item.slug)) out.push(item);
  }

  return out.slice(0, count);
}

function getFix(slug) {
  return fixes.find((fix) => fix.slug === slug);
}

function getFixesBySlugs(slugs) {
  return slugs.map(getFix).filter(Boolean);
}

function LinkCard({ fix, cta = "Open guide →" }) {
  return (
    <Link
      href={`/fix/${fix.slug}`}
      className="card"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 15 }}>{fix.slug}</div>

      <div
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        {fix.title}
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 14,
          color: "rgba(0,0,0,0.72)",
          lineHeight: 1.55,
        }}
      >
        {fix.description}
      </div>

      <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>{cta}</div>
    </Link>
  );
}

function SectionGrid({ title, intro, items }) {
  if (!items.length) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ marginBottom: 8 }}>{title}</h2>
      <p style={{ marginTop: 0 }}>{intro}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
          marginTop: 14,
        }}
      >
        {items.map((fix) => (
          <LinkCard key={`${title}-${fix.slug}`} fix={fix} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const featured = pickStable(fixes, "home-featured-v2", 6);

  const updateFixes = getFixesBySlugs([
    "0x80070422",
    "0x80070424",
    "0x80070002",
    "0x800705b4",
    "0x80240034",
    "0x8024200d",
  ]);

  const networkFixes = getFixesBySlugs([
    "0x80072ee7",
    "0x8024401c",
    "0x80072efd",
    "0x80072efe",
    "0x8024402f",
    "0x80072f8f",
  ]);

  const installFixes = getFixesBySlugs([
    "0x80070643",
    "0x80070652",
    "0x80070570",
    "0x80070057",
    "0x8007000d",
    "0x80070003",
  ]);

  const storeFixes = getFixesBySlugs([
    "0x80073cf3",
    "0x80073cf9",
    "0x80073d02",
    "0x80131500",
  ]);

  const activationFixes = getFixesBySlugs([
    "0xc004f074",
    "0xc004f050",
    "0xc004c003",
    "0xc004f213",
  ]);

  return (
    <main className="container prose">
      <h1>Windows Fix Guides</h1>

      <p>
        Step-by-step help for Windows error codes, update failures, install problems,
        Microsoft Store issues, activation errors, and network-related Windows problems.
      </p>

      <p>
        Every guide explains what the error means, what to try first, advanced repair
        steps, command-line fixes, and when an automated repair tool may help.
      </p>

      {featured.length ? (
        <section
          className="card"
          style={{
            marginTop: 20,
            padding: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0 }}>Popular Windows Error Fixes</h2>
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.65)" }}>
              Strong starting points for common problems
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              marginTop: 14,
            }}
          >
            {featured.map((fix) => (
              <LinkCard key={`featured-${fix.slug}`} fix={fix} cta="Open guide →" />
            ))}
          </div>
        </section>
      ) : null}

      <SectionGrid
        title="Windows Update Errors"
        intro="These are some of the most common Windows Update error codes, including disabled services, corrupted update cache, incomplete downloads, and stuck update components."
        items={updateFixes}
      />

      <SectionGrid
        title="Network and Connection Errors"
        intro="Use these guides if Windows Update, Microsoft services, or Outlook are failing because of DNS issues, proxy or VPN interference, firewall filtering, or unstable networking."
        items={networkFixes}
      />

      <SectionGrid
        title="Install and Corruption Errors"
        intro="These fixes cover installer failures, corrupted files, invalid parameters, damaged system files, and other Windows repair scenarios."
        items={installFixes}
      />

      <SectionGrid
        title="Microsoft Store Errors"
        intro="Use these guides when Microsoft Store apps won’t download, install, update, or connect correctly."
        items={storeFixes}
      />

      <SectionGrid
        title="Windows Activation Errors"
        intro="These guides help with blocked keys, missing digital licenses, KMS connectivity problems, and other activation failures."
        items={activationFixes}
      />

      <section id="all-guides" style={{ marginTop: 30, scrollMarginTop: 90 }}>
        <h2>All Windows Error Fix Guides</h2>
        <p>
          Browse the full library of Windows error code guides below. Each page is built
          to help you identify the cause quickly and work through the best repair steps in order.
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
              <div style={{ fontWeight: 800, fontSize: 16 }}>{fix.slug}</div>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "rgba(0,0,0,0.72)",
                  lineHeight: 1.55,
                }}
              >
                {fix.description}
              </div>

              <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700 }}>
                View fix →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="card" style={{ marginTop: 28 }}>
        <strong>Tip:</strong>
        <p style={{ marginTop: 8 }}>
          Start with the exact error code you see on screen. If you’re dealing with several
          Windows errors at once, open one guide first, then use the related links inside each page
          to work through connected problems.
        </p>
      </div>
    </main>
  );
}
import Link from "next/link";
import { fixes } from "@/app/fixes";

export const metadata = {
  title:
    "Microsoft Store Errors: Fix Download, Install, Update, and Sign-In Problems",
  description:
    "Fix common Microsoft Store error codes including install failures, update errors, cache problems, and Store sign-in issues with step-by-step repair guides.",
  alternates: {
    canonical: "/microsoft-store-errors",
  },
  openGraph: {
    title:
      "Microsoft Store Errors: Fix Download, Install, Update, and Sign-In Problems",
    description:
      "Fix common Microsoft Store error codes including install failures, update errors, cache problems, and Store sign-in issues with step-by-step repair guides.",
    url: "https://fixerrorhelp.com/microsoft-store-errors",
    siteName: "Fix Error Help",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Microsoft Store Errors: Fix Download, Install, Update, and Sign-In Problems",
    description:
      "Fix common Microsoft Store error codes including install failures, update errors, cache problems, and Store sign-in issues with step-by-step repair guides.",
  },
};

function getFix(slug) {
  return fixes.find((fix) => fix.slug === slug);
}

const featuredStoreFixes = [
  "0x80073cf3",
  "0x80073cf9",
  "0x80073d02",
  "0x80131500",
]
  .map(getFix)
  .filter(Boolean);

const relatedNetworkFixes = ["0x80072ee7", "0x80072efd", "0x80072efe"]
  .map(getFix)
  .filter(Boolean);

const relatedPermissionFixes = ["0x80070005"]
  .map(getFix)
  .filter(Boolean);

function GuideCard({ fix }) {
  if (!fix) return null;

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
        {fix.title.startsWith("Fix ") ? `How to Fix Windows Error ${fix.slug}` : fix.title}
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

      <div
        style={{
          marginTop: 14,
          fontSize: 14,
          fontWeight: 800,
        }}
      >
        Open guide →
      </div>
    </Link>
  );
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Microsoft Store Errors",
  url: "https://fixerrorhelp.com/microsoft-store-errors",
  description:
    "A collection of Microsoft Store error code repair guides for install failures, update issues, app conflicts, and sign-in problems.",
};

export default function MicrosoftStoreErrorsPage() {
  return (
    <main className="container prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <h1>Microsoft Store Errors</h1>

      <p className="lead">
        Use these guides when Microsoft Store apps will not install, fail to
        update, refuse to open correctly, or show connection and sign-in
        problems.
      </p>

      <p>
        Microsoft Store errors are often caused by a corrupted Store cache,
        damaged app permissions, network connection problems, date and time
        issues, or Windows system file corruption. Start with the exact error
        code you see, then work through the matching repair guide.
      </p>

      <section className="callout" style={{ marginTop: 22 }}>
        <h2>Best first steps for Microsoft Store problems</h2>
        <ol className="steps">
          <li>Restart your PC and try the Store again.</li>
          <li>Run <code>wsreset.exe</code> to clear the Microsoft Store cache.</li>
          <li>Check your internet connection and disable VPN or proxy temporarily.</li>
          <li>Make sure Windows date and time are set correctly.</li>
          <li>Install any pending Windows updates.</li>
        </ol>
      </section>

      <section className="section">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Common Microsoft Store Error Codes</h2>
        </div>

        <p style={{ marginTop: 0 }}>
          These are the main Microsoft Store repair guides currently available on
          the site, covering install failures, stuck updates, app conflicts, and
          sign-in or connection issues. 
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {featuredStoreFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 28 }}>
        <strong>Tip:</strong>
        <p style={{ marginTop: 8 }}>
          If you are not sure whether your Store problem is caused by networking,
          permissions, or the app itself, start with the exact Store error code
          first. Then use the related guides below if you still see connection
          failures or access-denied behavior.
        </p>
      </section>

      <section className="section">
        <h2>What usually causes Microsoft Store errors?</h2>

        <p>
          Microsoft Store problems usually come from one of four buckets:
          corrupted Store cache, app install or update conflicts, network or DNS
          failures, or Windows permission and system-file problems.
        </p>

        <p>
          That is why many Store fixes overlap with network repair steps,
          Windows Update repairs, and general permission troubleshooting. Some
          Store issues can also improve after repairing Windows system files with{" "}
          <code>DISM</code> and <code>sfc /scannow</code>. 
        </p>
      </section>

      <section className="section">
        <h2>Related network and connection guides</h2>

        <p style={{ marginTop: 0 }}>
          Use these if Microsoft Store is failing because it cannot connect,
          resolve Microsoft services, or complete downloads normally.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {relatedNetworkFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Related permission and install guides</h2>

        <p style={{ marginTop: 0 }}>
          If a Store install is blocked by permissions or Windows is returning an
          access-denied message, this guide is often the next place to check.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {relatedPermissionFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Related troubleshooting hubs</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          <Link
            href="/windows-update-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>Windows Update Errors</div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse update-related repair guides for corrupted cache, stuck
              services, incomplete downloads, and servicing failures.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Windows Update hub →
            </div>
          </Link>

          <Link
            href="/network-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>Network Errors</div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse network-related repair guides for DNS problems, server
              connection failures, VPN or proxy interference, and interrupted
              traffic.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Network hub →
            </div>
          </Link>

          <Link
            href="/activation-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>Activation Errors</div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse activation-related repair guides for invalid keys, missing
              digital licenses, blocked product keys, and KMS issues.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Activation hub →
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
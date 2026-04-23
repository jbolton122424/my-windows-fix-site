import Link from "next/link";
import { fixes } from "@/app/fixes";

export const metadata = {
  title:
    "Outlook Errors: Fix Send/Receive Failures, Connection Issues, and Mailbox Problems",
  description:
    "Fix common Outlook error codes including send/receive failures, connection issues, corrupted profiles, and mailbox synchronization problems.",
  alternates: {
    canonical: "/outlook-errors",
  },
  openGraph: {
    title:
      "Outlook Errors: Fix Send/Receive Failures, Connection Issues, and Mailbox Problems",
    description:
      "Fix common Outlook error codes including send/receive failures, connection issues, corrupted profiles, and mailbox synchronization problems.",
    url: "https://fixerrorhelp.com/outlook-errors",
    siteName: "Fix Error Help",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Outlook Errors: Fix Send/Receive Failures, Connection Issues, and Mailbox Problems",
    description:
      "Fix common Outlook error codes including send/receive failures, connection issues, corrupted profiles, and mailbox synchronization problems.",
  },
};

function getFix(slug) {
  return fixes.find((fix) => fix.slug === slug);
}

const outlookFixes = [
  "0x8004210a",
  "0x800ccc0e",
  "0x800ccc0f",
  "0x8004010f",
  "0x80040154",
  "0x80004002",
  "0x8007001d",
  "0x8009030f",
  "0x80090302",
]
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

      <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700 }}>
        {`How to Fix Windows Error ${fix.slug}`}
      </div>

      <div style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.72)" }}>
        {fix.description}
      </div>

      <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
        Open guide →
      </div>
    </Link>
  );
}

export default function OutlookErrorsPage() {
  return (
    <main className="container prose">
      <h1>Outlook Errors</h1>

      <p className="lead">
        Fix Outlook send/receive errors, connection failures, and mailbox
        synchronization problems with step-by-step repair guides.
      </p>

      <p>
        Outlook errors often occur due to incorrect account settings, network
        issues, corrupted profiles, or problems connecting to mail servers.
        Start with your exact error code and follow the matching guide.
      </p>

      <section className="callout" style={{ marginTop: 22 }}>
        <h2>Best first steps for Outlook problems</h2>
        <ol className="steps">
          <li>Restart Outlook and try sending or receiving again.</li>
          <li>Check your internet connection.</li>
          <li>Verify your email account settings.</li>
          <li>Disable VPN or proxy temporarily.</li>
          <li>Repair your Outlook profile if issues persist.</li>
        </ol>
      </section>

      <section className="section">
        <h2>Common Outlook Error Codes</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {outlookFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>
    </main>
  );
}

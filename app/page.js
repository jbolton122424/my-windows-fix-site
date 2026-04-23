import Link from "next/link";
import { fixes } from "@/app/fixes";

function getFix(slug) {
  return fixes.find((fix) => fix.slug === slug);
}

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
        border: "1px solid rgba(0,0,0,0.1)",
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
        {`How to Fix Windows Error ${fix.slug}`}
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
      <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
        Open guide →
      </div>
    </Link>
  );
}

const popularFixes = [
  "0xc004f213",
  "0xc004f050",
  "0x8007007e",
  "0x800705b4",
  "0x80240034",
  "0x8024200d",
]
  .map(getFix)
  .filter(Boolean);

const windowsUpdateFixes = [
  "0x80070422",
  "0x80070424",
  "0x80070002",
  "0x800705b4",
  "0x80240034",
  "0x8024200d",
]
  .map(getFix)
  .filter(Boolean);

const networkFixes = [
  "0x80072ee7",
  "0x8024401c",
  "0x80072efd",
  "0x80072efe",
  "0x8024402f",
  "0x80072f8f",
]
  .map(getFix)
  .filter(Boolean);

const installFixes = [
  "0x80070643",
  "0x80070652",
  "0x80070570",
  "0x80070057",
  "0x8007000d",
  "0x80070003",
]
  .map(getFix)
  .filter(Boolean);

const microsoftStoreFixes = [
  "0x80073cf3",
  "0x80073cf9",
  "0x80073d02",
  "0x80131500",
]
  .map(getFix)
  .filter(Boolean);

const activationFixes = ["0xc004f074", "0xc004f050", "0xc004c003", "0xc004f213"]
  .map(getFix)
  .filter(Boolean);

const allGuides = fixes.slice(0, 12);

export default function HomePage() {
  return (
    <main className="container prose">
      <h1>Windows Fix Guides</h1>

      <p>
        Step-by-step help for Windows error codes, update failures, install
        problems, Microsoft Store issues, activation errors, Outlook errors,
        and network-related Windows problems.
      </p>

      <p>
        Every guide explains what the error means, what to try first, advanced
        repair steps, command-line fixes, and when an automated repair tool may
        help.
      </p>

      <section className="card" style={{ marginTop: 20, padding: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
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
          {popularFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 20, padding: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0 }}>Browse by topic</h2>
          <span style={{ fontSize: 13, color: "rgba(0,0,0,0.65)" }}>
            Start with a category hub if you&apos;re troubleshooting a broader
            Windows problem
          </span>
        </div>

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
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Windows Update Errors
            </div>
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
            href="/activation-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Activation Errors
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse activation-related repair guides for invalid keys, blocked
              licenses, missing digital licenses, and KMS connectivity problems.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Activation hub →
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
              border: "1px solid rgba(0,0,0,0.1)",
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
              Browse network-related repair guides for DNS problems, proxy or
              VPN issues, Outlook connectivity failures, and interrupted server
              connections.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Network hub →
            </div>
          </Link>

          <Link
            href="/microsoft-store-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Microsoft Store Errors
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse Microsoft Store repair guides for app install failures,
              update problems, cache issues, and Store sign-in or connection
              errors.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Microsoft Store hub →
            </div>
          </Link>

          <Link
            href="/install-and-corruption-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Install and Corruption Errors
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse repair guides for setup failures, damaged files, invalid
              parameters, and Windows corruption-related install problems.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Install hub →
            </div>
          </Link>

          <Link
            href="/outlook-errors"
            className="card"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: 18,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Outlook Errors
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "rgba(0,0,0,0.72)",
                lineHeight: 1.6,
              }}
            >
              Browse Outlook repair guides for send/receive failures, mailbox
              sync problems, server connection issues, and profile errors.
            </div>
            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800 }}>
              Open Outlook hub →
            </div>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Windows Update Errors</h2>
          <Link
            href="/windows-update-errors"
            style={{
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Browse all Windows Update errors →
          </Link>
        </div>

        <p style={{ marginTop: 0 }}>
          These are some of the most common Windows Update error codes,
          including disabled services, corrupted update cache, incomplete
          downloads, and stuck update components.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {windowsUpdateFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Network and Connection Errors</h2>
          <Link
            href="/network-errors"
            style={{
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Browse all Network errors →
          </Link>
        </div>

        <p style={{ marginTop: 0 }}>
          Use these guides if Windows Update, Microsoft services, or Outlook are
          failing because of DNS issues, proxy or VPN interference, firewall
          filtering, or unstable networking.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {networkFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Install and Corruption Errors</h2>
        </div>

        <p style={{ marginTop: 0 }}>
          These fixes cover installer failures, corrupted files, invalid
          parameters, damaged system files, and other Windows repair scenarios.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {installFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Microsoft Store Errors</h2>
          <Link
            href="/microsoft-store-errors"
            style={{
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Browse all Microsoft Store errors →
          </Link>
        </div>

        <p style={{ marginTop: 0 }}>
          Use these guides when Microsoft Store apps fail to install, do not
          update correctly, refuse to open, or run into sign-in and connection
          problems.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {microsoftStoreFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>Windows Activation Errors</h2>
          <Link
            href="/activation-errors"
            style={{
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Browse all Activation errors →
          </Link>
        </div>

        <p style={{ marginTop: 0 }}>
          These guides help with blocked keys, missing digital licenses, KMS
          connectivity problems, and other activation failures.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {activationFixes.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>

      <section id="all-guides" style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ marginBottom: 8 }}>All Windows Error Fix Guides</h2>
        </div>

        <p style={{ marginTop: 0 }}>
          Browse the full library of Windows error code guides below. Each page
          is built to help you identify the cause quickly and work through the
          best repair steps in order.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {allGuides.map((fix) => (
            <GuideCard key={fix.slug} fix={fix} />
          ))}
        </div>
      </section>
    </main>
  );
}
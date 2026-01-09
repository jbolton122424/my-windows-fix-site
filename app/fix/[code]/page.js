// app/fix/[code]/page.js
import { fixes } from "@/app/fixes";

/**
 * Dynamic SEO metadata per error code page.
 * Next.js will call this on the server to generate <title> and <meta name="description" ...>
 */
export async function generateMetadata({ params }) {
  const { code: slug } = await params;
  const fix = fixes.find((f) => f.slug === slug);

  if (!fix) {
    return {
      title: "Fix not found | Windows Fix Guides",
      description: "This Windows error code guide could not be found.",
    };
  }

  return {
    title: `${fix.title} | Windows Fix Guides`,
    description: fix.description,
  };
}

export default async function FixPage({ params }) {
  const { code: slug } = await params;
  const fix = fixes.find((f) => f.slug === slug);

  if (!fix) {
    return (
      <main className="container prose">
        <h1>Page not found</h1>
        <p>No guide found for this error code.</p>
      </main>
    );
  }

  // Custom, high-quality page for ONE code (0x80070422)
  if (slug === "0x80070422") {
    return (
      <main className="container prose">
        <h1>How to Fix Windows Error 0x80070422</h1>

        <p>
          Error <strong>0x80070422</strong> usually means Windows Update is
          disabled or a required service isn’t running. Most people can fix it
          in just a few minutes.
        </p>

        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
            marginTop: 18,
            marginBottom: 12,
          }}
        >
          <div className="card">
            <strong>Most common cause</strong>
            <p style={{ marginTop: 8 }}>
              Windows Update service is disabled or stopped.
            </p>
          </div>

          <div className="card">
            <strong>Time to fix</strong>
            <p style={{ marginTop: 8 }}>5–15 minutes for most PCs.</p>
          </div>

          <div className="card">
            <strong>Safe?</strong>
            <p style={{ marginTop: 8 }}>
              Yes — these steps use built-in Windows tools.
            </p>
          </div>
        </div>

        <h2>What causes this error?</h2>
        <ul>
          <li>Windows Update service is disabled</li>
          <li>Required system services are stopped</li>
          <li>Policies or configuration blocking updates</li>
        </ul>

        <h2>Fix 1: Enable the Windows Update service</h2>
        <ol>
          <li>
            Press <strong>Windows + R</strong>
          </li>
          <li>
            Type <code>services.msc</code> and press Enter
          </li>
          <li>
            Find <strong>Windows Update</strong>
          </li>
          <li>Double-click it</li>
          <li>
            Set <strong>Startup type</strong> to <strong>Automatic</strong>
          </li>
          <li>
            Click <strong>Start</strong>, then click <strong>OK</strong>
          </li>
        </ol>

        <h2>Fix 2: Make sure required services are running</h2>
        <p>In the same Services list, confirm these are running:</p>
        <ul>
          <li>Windows Update</li>
          <li>Background Intelligent Transfer Service (BITS)</li>
          <li>Cryptographic Services</li>
        </ul>

        <h2>If the error still appears</h2>
        <p>
          Restart your computer and try Windows Update again. If it still fails,
          the update components may be corrupted — we can add an “advanced fixes”
          section next (DISM/SFC + Windows Update reset).
        </p>
      </main>
    );
  }

  // Default page layout for all other codes (clean + consistent)
  return (
    <main className="container prose">
      <h1>{fix.title}</h1>
      <p>{fix.description}</p>

      <div className="card" style={{ marginTop: 18 }}>
        <strong>Next step</strong>
        <p style={{ marginTop: 8 }}>
          We’ll add full step-by-step troubleshooting instructions for this
          error code next.
        </p>
      </div>
    </main>
  );
}

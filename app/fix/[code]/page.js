// app/fix/[code]/page.js
import { fixes } from "@/app/fixes";

/**
 * SEO metadata per error code page
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

  // Light “defaults” so every page feels complete even if you haven’t customized it yet
  const commonCause =
    fix.whatItMeans ||
    "This error is commonly caused by a Windows configuration or service issue.";
  const timeToFix = "10–25 minutes";
  const safeNote = "Yes — these steps use built-in Windows tools.";

  return (
    <main className="container prose">
      <h1>{fix.title}</h1>

      <p>{fix.description}</p>

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
          <p style={{ marginTop: 8 }}>{commonCause}</p>
        </div>

        <div className="card">
          <strong>Time to fix</strong>
          <p style={{ marginTop: 8 }}>{timeToFix}</p>
        </div>

        <div className="card">
          <strong>Safe?</strong>
          <p style={{ marginTop: 8 }}>{safeNote}</p>
        </div>
      </div>

      <h2>What this error means</h2>
      <p>{fix.whatItMeans}</p>

      <h2>Try these fixes first</h2>
      <ol>
        {(fix.tryFirst || []).map((step, idx) => (
          <li key={`${slug}-try-${idx}`}>{step}</li>
        ))}
      </ol>

      <h2>Advanced steps</h2>
      <ul>
        {(fix.advanced || []).map((step, idx) => (
          <li key={`${slug}-adv-${idx}`}>{step}</li>
        ))}
      </ul>

      <h2>Still stuck?</h2>
      <div className="card">
        <p style={{ marginTop: 0 }}>
          If none of the steps above worked, here are the next best actions:
        </p>
        <ul style={{ marginBottom: 0 }}>
          <li>
            Take note of the exact error code and what you were doing when it
            appeared.
          </li>
          <li>
            Restart your PC and try the same action again (updates/install).
          </li>
          <li>
            If this is Windows Update, consider resetting Windows Update
            components (we can add the full copy/paste script next).
          </li>
        </ul>
      </div>
    </main>
  );
}

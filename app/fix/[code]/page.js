// app/fix/[code]/page.js
import { fixes } from "../../fixes";

// Optional: If you want better SEO per page, Next can generate metadata per code.
export async function generateMetadata({ params }) {
  const { code } = await params;
  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return {
      title: "Fix not found",
      description: "No guide found for this error code.",
    };
  }

  // Custom SEO for the monetized page
  if (code === "0x80070422") {
    return {
      title: "Fix Windows Error 0x80070422 (Windows Update Disabled)",
      description:
        "Step-by-step instructions to fix Windows error 0x80070422 by enabling Windows Update services and resetting update components.",
    };
  }

  // Default SEO for other error codes
  return {
    title: `${fix.title} (Step-by-step Fix)`,
    description: fix.description,
  };
}

export default async function FixPage({ params }) {
  const { code } = await params; // IMPORTANT for Next.js 16 (params is a Promise)
  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return (
      <main className="container">
        <article className="article">
          <header className="articleHeader">
            <h1>Page not found</h1>
            <p className="lead">
              No guide found for <strong>{code}</strong>.
            </p>
          </header>

          <section className="section">
            <p>
              Try going back to the homepage and selecting a listed error code.
            </p>
          </section>
        </article>
      </main>
    );
  }

  // ✅ Special “monetized” page layout/content for 0x80070422
  if (code === "0x80070422") {
    return (
      <main className="container">
        <article className="article">
          <header className="articleHeader">
            <h1>How to Fix Windows Error 0x80070422</h1>

            <p className="lead">
              Windows error <strong>0x80070422</strong> usually appears when the{" "}
              <strong>Windows Update</strong> service is disabled or not running.
              This prevents updates, security patches, and feature installs from
              completing successfully.
            </p>

            <p className="lead">
              Start with the free steps below. If it still isn’t fixed, use the
              “If the error still persists” section near the bottom.
            </p>
          </header>

          <section className="section">
            <h2>Method 1: Enable the Windows Update Service</h2>

            <ol className="steps">
              <li>
                Press <strong>Windows + R</strong>, type{" "}
                <code>services.msc</code>, and press Enter.
              </li>
              <li>
                Find <strong>Windows Update</strong> in the list.
              </li>
              <li>
                Double-click it. Set <strong>Startup type</strong> to{" "}
                <strong>Automatic</strong>.
              </li>
              <li>
                Click <strong>Start</strong>, then <strong>Apply</strong>.
              </li>
              <li>Restart your PC and try Windows Update again.</li>
            </ol>
          </section>

          <section className="section">
            <h2>Method 2: Reset Windows Update Components</h2>

            <p>
              If enabling the service didn’t work, Windows Update components may
              be stuck or corrupted. This reset is safe and commonly fixes{" "}
              <strong>0x80070422</strong>.
            </p>

            <ol className="steps">
              <li>
                Open <strong>Command Prompt</strong> as Administrator:
                <ul>
                  <li>Click Start and type <strong>cmd</strong></li>
                  <li>
                    Right-click <strong>Command Prompt</strong> →{" "}
                    <strong>Run as administrator</strong>
                  </li>
                </ul>
              </li>
              <li>Run these commands one at a time:</li>
            </ol>

            <pre className="codeBlock">{`net stop wuauserv
net stop bits
net stop cryptsvc
net stop msiserver

ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old
ren C:\\Windows\\System32\\catroot2 catroot2.old

net start wuauserv
net start bits
net start cryptsvc
net start msiserver`}</pre>

            <p>Restart your PC and try Windows Update again.</p>
          </section>

          <section className="section callout">
            <h2>If the Error Still Persists</h2>

            <p>
              If system files or update components are damaged, manual steps may
              not fully resolve <strong>0x80070422</strong>.
            </p>

            <p>
              In that case, an automated Windows repair tool can scan for common
              causes like broken update services and corrupted system files.
            </p>

            <p className="cta">
              <strong>Recommended option:</strong>{" "}
              <a
                href="YOUR_AFFILIATE_LINK_HERE"
                target="_blank"
                rel="nofollow sponsored"
              >
                Fix Windows Update errors automatically with this repair tool
              </a>
            </p>

            <p className="note">
              (This link is a placeholder for now. We’ll replace it with your real
              affiliate link later.)
            </p>
          </section>

          <section className="section">
            <h2>Frequently Asked Questions</h2>

            <h3>What causes error 0x80070422?</h3>
            <p>
              Most commonly it’s caused by the Windows Update service being
              disabled. It can also be caused by corrupted update components or
              system files.
            </p>

            <h3>Is error 0x80070422 dangerous?</h3>
            <p>
              The error itself isn’t dangerous, but it can prevent security
              updates from installing.
            </p>

            <h3>Can this error fix itself?</h3>
            <p>
              Sometimes a restart or re-enabling services fixes it. If it keeps
              returning, use the steps above.
            </p>
          </section>
        </article>
      </main>
    );
  }

  // ✅ Default page layout for all other error codes (for now)
  return (
    <main className="container">
      <article className="article">
        <header className="articleHeader">
          <h1>{fix.title}</h1>
          <p className="lead">{fix.description}</p>
        </header>

        <section className="section">
          <h2>Quick Fix Checklist</h2>
          <ol className="steps">
            <li>Restart your PC and try the action again.</li>
            <li>Run Windows Update troubleshooter (if relevant).</li>
            <li>Check for pending updates and install them.</li>
            <li>
              If the error persists, we’ll expand this page with step-by-step
              instructions.
            </li>
          </ol>
        </section>
      </article>
    </main>
  );
}

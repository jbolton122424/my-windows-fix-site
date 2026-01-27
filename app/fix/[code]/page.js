// app/fix/[code]/page.js
import { fixes } from "../../fixes";
import { WINDOWS_REPAIR_AFFILIATE_LINK } from "../../affiliate";

// ✅ Outbyte required policy/support links (Jenny request)
const OUTBYTE_LICENSE_URL =
  "https://outbyte.com/license-agreement/?_sid=MDaueUftfW&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM5*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_PRIVACY_URL =
  "https://outbyte.com/privacy-policy/?_sid=OEPkor2MUC&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM5*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_CONTACT_URL =
  "https://outbyte.com/support/contact/?_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM9*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_UNINSTALL_URL =
  "https://outbyte.com/support/how-to-uninstall/?program=Outbyte%252520PCRepair&_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM9*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

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

function OutbytePolicyLinks() {
  return (
    <p className="ctaLinks">
      <a href={OUTBYTE_LICENSE_URL} target="_blank" rel="nofollow noopener">
        License Agreement
      </a>
      {" | "}
      <a href={OUTBYTE_PRIVACY_URL} target="_blank" rel="nofollow noopener">
        Privacy Policy
      </a>
      {" | "}
      <a href={OUTBYTE_CONTACT_URL} target="_blank" rel="nofollow noopener">
        Contact
      </a>
      {" | "}
      <a href={OUTBYTE_UNINSTALL_URL} target="_blank" rel="nofollow noopener">
        How to Uninstall
      </a>
    </p>
  );
}

export default async function FixPage({ params }) {
  const { code } = await params; // IMPORTANT for Next.js 16 (params is a Promise)
  const fix = fixes.find((f) => f.slug === code);

  const hasScriptSection =
    fix &&
    fix.scriptSection &&
    typeof fix.scriptSection === "object" &&
    typeof fix.scriptSection.code === "string" &&
    fix.scriptSection.code.trim().length > 0;

  const hasAffiliateCallout =
    fix &&
    fix.affiliateCallout &&
    typeof fix.affiliateCallout === "object" &&
    typeof fix.affiliateCallout.ctaText === "string" &&
    fix.affiliateCallout.ctaText.trim().length > 0;

  // Universal FAQ for all default pages
  const showUniversalFaq = true;

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

          {/* ✅ Internal links for 0x80070422 */}
          <section className="section">
            <h2>Related Windows Errors</h2>
            <p>
              If Windows Update is failing with multiple errors, these related
              guides may also help:
            </p>
            <ul>
              <li>
                <a href="/fix/0x80070005">
                  Fix Windows error 0x80070005 (Access Denied)
                </a>
              </li>
              <li>
                <a href="/fix/0x800f081f">
                  Fix Windows error 0x800f081f (Update component missing)
                </a>
              </li>
            </ul>
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

            {/* ✅ Style 1 CTA */}
            <div className="ctaRow">
              <div className="ctaLabel">Recommended option</div>
              <a
                className="ctaButton"
                href={WINDOWS_REPAIR_AFFILIATE_LINK}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                Fix Windows Update errors automatically
              </a>

              <OutbytePolicyLinks />

              {/* Disclosure is optional per Jenny */}
              <p className="note">
                Disclosure: We may earn a commission if you purchase through this
                link (at no extra cost to you).
              </p>
            </div>
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

  // ✅ Default page layout for all other error codes
  return (
    <main className="container">
      <article className="article">
        <header className="articleHeader">
          <h1>{fix.title}</h1>
          <p className="lead">{fix.description}</p>
        </header>

        <section className="section">
          <h2>What it means</h2>
          <p>{fix.whatItMeans}</p>
        </section>

        <section className="section">
          <h2>Try this first</h2>
          <ol className="steps">
            {fix.tryFirst.map((item, idx) => (
              <li key={`tryfirst-${idx}`}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2>Advanced steps</h2>
          <ol className="steps">
            {fix.advanced.map((item, idx) => (
              <li key={`advanced-${idx}`}>{item}</li>
            ))}
          </ol>
        </section>

        {/* ✅ Internal links for 0x800f081f only (default layout) */}
{code === "0x800f081f" ? (
  <section className="section">
    <h2>Related Windows Errors</h2>
    <p>
      If Windows Update is failing due to missing or corrupted components, these
      related guides may also help:
    </p>
    <ul>
      <li>
        <a href="/fix/0x80070422">
          Fix Windows error 0x80070422 (Windows Update disabled)
        </a>
      </li>
      <li>
        <a href="/fix/0x80073712">
          Fix Windows error 0x80073712 (component store corruption)
        </a>
      </li>
    </ul>
  </section>
) : null}



        {hasScriptSection ? (
          <section className="section">
            <h2>{fix.scriptSection.title || "Commands to Try"}</h2>
            {fix.scriptSection.intro ? <p>{fix.scriptSection.intro}</p> : null}
            {fix.scriptSection.stepsIntro ? (
              <p>{fix.scriptSection.stepsIntro}</p>
            ) : null}
            <pre className="codeBlock">{fix.scriptSection.code}</pre>
            {fix.scriptSection.outro ? <p>{fix.scriptSection.outro}</p> : null}
          </section>
        ) : null}

        {/* ✅ Internal links for 0x80070005 only (default layout) */}
        {code === "0x80070005" ? (
          <section className="section">
            <h2>Related Windows Errors</h2>
            <p>
              If you’re running into permission or update-related problems, these
              guides may also help:
            </p>
            <ul>
              <li>
                <a href="/fix/0x80070422">
                  Fix Windows error 0x80070422 (Windows Update disabled)
                </a>
              </li>
              <li>
                <a href="/fix/0x800f081f">
                  Fix Windows error 0x800f081f (missing update components)
                </a>
              </li>
            </ul>
          </section>
        ) : null}
        {/* ✅ Internal links for 0x80073712 only (default layout) */}
{code === "0x80073712" ? (
  <section className="section">
    <h2>Related Windows Errors</h2>
    <p>
      If Windows Update is failing due to component store corruption, these
      related guides may also help:
    </p>
    <ul>
      <li>
        <a href="/fix/0x80070422">
          Fix Windows error 0x80070422 (Windows Update disabled)
        </a>
      </li>
      <li>
        <a href="/fix/0x800f081f">
          Fix Windows error 0x800f081f (Update component missing)
        </a>
      </li>
    </ul>
  </section>
) : null}


        {hasAffiliateCallout ? (
          <section className="section callout">
            <h2>{fix.affiliateCallout.title || "If the Error Still Persists"}</h2>

            {Array.isArray(fix.affiliateCallout.body)
              ? fix.affiliateCallout.body.map((p, idx) => (
                  <p key={`body-${idx}`}>{p}</p>
                ))
              : fix.affiliateCallout.body
              ? <p>{fix.affiliateCallout.body}</p>
              : null}

            {/* ✅ Style 1 CTA */}
            <div className="ctaRow">
              <div className="ctaLabel">Recommended option</div>
              <a
                className="ctaButton"
                href={WINDOWS_REPAIR_AFFILIATE_LINK}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                {fix.affiliateCallout.ctaText}
              </a>

              <OutbytePolicyLinks />

              {fix.affiliateCallout.note ? (
                <p className="note">{fix.affiliateCallout.note}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* ✅ Universal FAQ added to every default error page */}
        {showUniversalFaq ? (
          <section className="section">
            <h2>Frequently Asked Questions</h2>

            <h3>What causes error {code}?</h3>
            <p>
              This error usually occurs when a required Windows component,
              service, or system file is not working correctly. It may be caused
              by corrupted system files, disabled services, failed updates, or
              software conflicts.
            </p>

            <h3>Is error {code} dangerous?</h3>
            <p>
              The error itself is not dangerous, but it can prevent Windows
              features, updates, or applications from working properly. If
              ignored, it may lead to stability or security issues over time.
            </p>

            <h3>Can error {code} be fixed without reinstalling Windows?</h3>
            <p>
              Yes. In most cases, this error can be resolved using
              troubleshooting steps such as repairing system files, enabling
              required services, or using automated repair tools, without
              needing to reinstall Windows.
            </p>
          </section>
        ) : null}
      </article>
    </main>
  );
}

// app/fix/[code]/page.js
import { WINDOWS_REPAIR_AFFILIATE_LINK } from "../../affiliate";
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

  // Keep your custom SEO for the primary monetized page
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

  const hasWhatItMeans = Boolean(fix.whatItMeans);
  const hasTryFirst = Array.isArray(fix.tryFirst) && fix.tryFirst.length > 0;
  const hasAdvanced = Array.isArray(fix.advanced) && fix.advanced.length > 0;

  const hasScript =
    fix.scriptSection &&
    typeof fix.scriptSection === "object" &&
    typeof fix.scriptSection.code === "string" &&
    fix.scriptSection.code.trim().length > 0;

  const hasAffiliate =
    fix.affiliateCallout &&
    typeof fix.affiliateCallout === "object" &&
    typeof fix.affiliateCallout.href === "string" &&
    fix.affiliateCallout.href.trim().length > 0 &&
    typeof fix.affiliateCallout.ctaText === "string" &&
    fix.affiliateCallout.ctaText.trim().length > 0;

  const hasFaq = Array.isArray(fix.faq) && fix.faq.length > 0;

  return (
    <main className="container">
      <article className="article">
        <header className="articleHeader">
          <h1>{fix.title}</h1>
          <p className="lead">{fix.description}</p>
          {hasWhatItMeans ? <p className="lead">{fix.whatItMeans}</p> : null}
        </header>

        <section className="section">
          <h2>Try These Fixes First</h2>

          {hasTryFirst ? (
            <ol className="steps">
              {fix.tryFirst.map((step, idx) => (
                <li key={`tryfirst-${idx}`}>{step}</li>
              ))}
            </ol>
          ) : (
            <ol className="steps">
              <li>Restart your PC and try again.</li>
              <li>Run Windows Update troubleshooter (if relevant).</li>
              <li>Check for pending updates and install them.</li>
            </ol>
          )}
        </section>

        <section className="section">
          <h2>Advanced Fixes</h2>

          {hasAdvanced ? (
            <ol className="steps">
              {fix.advanced.map((step, idx) => (
                <li key={`advanced-${idx}`}>{step}</li>
              ))}
            </ol>
          ) : (
            <ol className="steps">
              <li>Run: sfc /scannow (Command Prompt as Admin).</li>
              <li>Run: DISM /Online /Cleanup-Image /RestoreHealth</li>
              <li>Restart your PC and try again.</li>
            </ol>
          )}
        </section>

        {/* Optional script/code section (data-driven) */}
        {hasScript ? (
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

        {/* Optional affiliate callout (data-driven) */}
        {hasAffiliate ? (
          <section className="section callout">
            <h2>{fix.affiliateCallout.title || "If the Error Still Persists"}</h2>

            {Array.isArray(fix.affiliateCallout.body) ? (
              fix.affiliateCallout.body.map((p, idx) => <p key={`body-${idx}`}>{p}</p>)
            ) : fix.affiliateCallout.body ? (
              <p>{fix.affiliateCallout.body}</p>
            ) : null}

            <p className="cta">
              <strong>Recommended option:</strong>{" "}
              <a
                href={WINDOWS_REPAIR_AFFILIATE_LINK}

                target="_blank"
                rel="nofollow sponsored"
              >
                {fix.affiliateCallout.ctaText}
              </a>
            </p>

            {fix.affiliateCallout.note ? (
              <p className="note">{fix.affiliateCallout.note}</p>
            ) : null}
          </section>
        ) : null}

        {/* Optional FAQ (data-driven) */}
        {hasFaq ? (
          <section className="section">
            <h2>Frequently Asked Questions</h2>

            {fix.faq.map((item, idx) => (
              <div key={`faq-${idx}`}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        ) : null}
      </article>
    </main>
  );
}

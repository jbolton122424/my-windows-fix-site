// app/fix/[code]/page.js
import { fixes } from "../../fixes";
import { WINDOWS_REPAIR_AFFILIATE_LINK } from "../../affiliate";

// Outbyte links
const OUTBYTE_LICENSE_URL =
  "https://outbyte.com/license-agreement/?_sid=MDaueUftfW&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_PRIVACY_URL =
  "https://outbyte.com/privacy-policy/?_sid=OEPkor2MUC&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_CONTACT_URL =
  "https://outbyte.com/support/contact/?_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_UNINSTALL_URL =
  "https://outbyte.com/support/how-to-uninstall/?program=Outbyte%252520PCRepair&_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM5";

// Metadata
export async function generateMetadata({ params }) {
  const { code } = await params;
  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return { title: "Fix not found", description: "No guide found." };
  }

  return {
    title: `${fix.title} (Step-by-step Fix)`,
    description: fix.description,
  };
}

export default async function FixPage({ params }) {
  const { code } = await params;
  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return (
      <main className="container">
        <h1>Page not found</h1>
      </main>
    );
  }

  return (
    <main className="container">
      <article className="article">
        <h1>{fix.title}</h1>
        <p className="lead">{fix.description}</p>

        <section className="section">
          <h2>What it means</h2>
          <p>{fix.whatItMeans}</p>
        </section>

        <section className="section">
          <h2>Try this first</h2>
          <ol className="steps">
            {fix.tryFirst.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2>Advanced steps</h2>
          <ol className="steps">
            {fix.advanced.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </section>

        {/* ✅ INTERNAL LINKS — ONLY FOR 0x80070005 */}
        {code === "0x80070005" && (
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
        )}

        <section className="section callout">
          <div className="ctaRow">
            <div className="ctaLabel">Recommended option</div>
            <a
              className="ctaButton"
              href={WINDOWS_REPAIR_AFFILIATE_LINK}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              {fix.affiliateCallout?.ctaText || "Fix Windows errors automatically"}
            </a>

            <p className="ctaLinks">
              <a href={OUTBYTE_LICENSE_URL} target="_blank" rel="nofollow noopener">
                License Agreement
              </a>{" | "}
              <a href={OUTBYTE_PRIVACY_URL} target="_blank" rel="nofollow noopener">
                Privacy Policy
              </a>{" | "}
              <a href={OUTBYTE_CONTACT_URL} target="_blank" rel="nofollow noopener">
                Contact
              </a>{" | "}
              <a href={OUTBYTE_UNINSTALL_URL} target="_blank" rel="nofollow noopener">
                How to Uninstall
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}

// app/fix/[code]/page.js
import { fixes } from "../../fixes";
import { WINDOWS_REPAIR_AFFILIATE_LINK } from "../../affiliate";

// ✅ Outbyte required policy/support links
const OUTBYTE_LICENSE_URL =
  "https://outbyte.com/license-agreement/?_sid=MDaueUftfW&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_PRIVACY_URL =
  "https://outbyte.com/privacy-policy/?_sid=OEPkor2MUC&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_CONTACT_URL =
  "https://outbyte.com/support/contact/?_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_UNINSTALL_URL =
  "https://outbyte.com/support/how-to-uninstall/?program=Outbyte%252520PCRepair&_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM1*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

export async function generateMetadata({ params }) {
  const { code } = await params;
  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return {
      title: "Fix not found",
      description: "No guide found for this error code.",
    };
  }

  if (code === "0x80070422") {
    return {
      title: "Fix Windows Error 0x80070422 (Windows Update Disabled)",
      description:
        "Step-by-step instructions to fix Windows error 0x80070422 by enabling Windows Update services and resetting update components.",
    };
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
        <article className="article">
          <h1>Page not found</h1>
        </article>
      </main>
    );
  }

  // ✅ 0x80070422 PAGE WITH INTERNAL LINKS
  if (code === "0x80070422") {
    return (
      <main className="container">
        <article className="article">
          <h1>How to Fix Windows Error 0x80070422</h1>

          <p className="lead">
            Windows error <strong>0x80070422</strong> usually appears when the
            Windows Update service is disabled or not running.
          </p>

          <section className="section">
            <h2>Method 1: Enable the Windows Update Service</h2>
            <ol className="steps">
              <li>Press Windows + R and type <code>services.msc</code></li>
              <li>Find Windows Update</li>
              <li>Set Startup type to Automatic</li>
              <li>Start the service and restart your PC</li>
            </ol>
          </section>

          <section className="section">
            <h2>Method 2: Reset Windows Update Components</h2>
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
          </section>

          {/* ✅ INTERNAL LINKS SECTION (NEW) */}
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

          <section className="section">
            <h2>Frequently Asked Questions</h2>
            <p>This error is not dangerous but can block important updates.</p>
          </section>
        </article>
      </main>
    );
  }

  // Other pages unchanged
  return (
    <main className="container">
      <article className="article">
        <h1>{fix.title}</h1>
      </article>
    </main>
  );
}

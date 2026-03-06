// app/fix/[code]/page.js
import CopyCodeBlock from "../../components/CopyCodeBlock";
import { fixes } from "../../fixes";
import { WINDOWS_REPAIR_AFFILIATE_LINK } from "../../affiliate";
import { redirect } from "next/navigation";

const OUTBYTE_LICENSE_URL =
  "https://outbyte.com/license-agreement/?_sid=MDaueUftfW&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM2*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM5*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_PRIVACY_URL =
  "https://outbyte.com/privacy-policy/?_sid=OEPkor2MUC&_gl=1*hy9nn9*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM5*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_CONTACT_URL =
  "https://outbyte.com/support/contact/?_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM9*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const OUTBYTE_UNINSTALL_URL =
  "https://outbyte.com/support/how-to-uninstall/?program=Outbyte%252520PCRepair&_sid=OEPkor2MUC&_gl=1*1occp2y*_gcl_au*MjAyOTE0OTgxMS4xNzY5MDEzODM6*_ga*MTkzNDM5NTg0OS4xNzY5MDEzODM9*_ga_1EEJR9725E*czE3NjkwMTM4MzYkbzEkZzAkdDE3NjkwMTM4MzkkajU3JGwwJGgxNjkyMTU2ODc1";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixerrorhelp.com").replace(
  /\/$/,
  ""
);

export const dynamicParams = false;

export function generateStaticParams() {
  return (Array.isArray(fixes) ? fixes : [])
    .filter((fix) => fix?.slug)
    .map((fix) => ({
      code: fix.slug,
    }));
}

function normalize(raw) {
  try {
    return decodeURIComponent(String(raw || "")).trim().toLowerCase();
  } catch {
    return String(raw || "").trim().toLowerCase();
  }
}

function buildAbsoluteFixUrl(code) {
  return `${SITE_URL}/fix/${code}`;
}

function trimDescription(text, max = 158) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function buildCtrTitle(fix) {
  const code = fix?.slug || "";
  const baseTitle = fix?.title || `Fix ${code}`;
  const cleaned = baseTitle.replace(/^Fix\s+/i, "").trim();

  if (normalize(code) === "0x80070422") {
    return "Fix Windows Error 0x80070422 (Windows Update Disabled)";
  }

  return `How to Fix ${cleaned} in Windows (Step-by-Step)`;
}

function buildCtrDescription(fix) {
  const code = fix?.slug || "";
  const desc = String(fix?.description || "").trim();
  const meaning = String(fix?.whatItMeans || "").trim();

  if (normalize(code) === "0x80070422") {
    return trimDescription(
      "Step-by-step instructions to fix Windows error 0x80070422 by enabling Windows Update services and resetting update components."
    );
  }

  if (desc && meaning) {
    return trimDescription(`${desc} Learn what causes ${code} and the best step-by-step fixes to try.`);
  }

  if (desc) {
    return trimDescription(`${desc} Follow these step-by-step fixes for Windows.`);
  }

  return trimDescription(
    `Learn what causes Windows error ${code} and follow step-by-step fixes to repair it.`
  );
}

function buildOgTitle(fix) {
  const code = fix?.slug || "";
  if (normalize(code) === "0x80070422") {
    return "Fix Windows Error 0x80070422";
  }
  return `How to Fix ${fix?.slug || "This Windows Error"}`;
}

function buildBreadcrumbJsonLd(code, titleForCrumb) {
  const name = titleForCrumb || `Fix ${code}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Windows Error Fixes", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/fix/${code}` },
    ],
  };
}

function BreadcrumbJsonLd({ code, titleForCrumb }) {
  const jsonLd = buildBreadcrumbJsonLd(code, titleForCrumb);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export async function generateMetadata({ params }) {
  const { code } = await params;
  const requested = normalize(code);

  const candidates = [
    requested,
    requested.startsWith("0x") ? requested.slice(2) : requested,
    requested.startsWith("0x") ? requested : `0x${requested}`,
  ].filter(Boolean);

  const fix = fixes.find((f) => candidates.includes(normalize(f.slug)));

  if (!fix) {
    const fallbackUrl = buildAbsoluteFixUrl(code);
    return {
      title: `Fix ${code} | Fix Error Help`,
      description: `We don't have a guide for ${code} yet. Browse available Windows error fixes on Fix Error Help.`,
      alternates: {
        canonical: fallbackUrl,
      },
      robots: {
        index: false,
        follow: true,
      },
      openGraph: {
        title: `Fix ${code} | Fix Error Help`,
        description: `We don't have a guide for ${code} yet. Browse available Windows error fixes.`,
        url: fallbackUrl,
        siteName: "Fix Error Help",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `Fix ${code} | Fix Error Help`,
        description: `We don't have a guide for ${code} yet. Browse available Windows error fixes.`,
      },
    };
  }

  const canonicalUrl = buildAbsoluteFixUrl(fix.slug);
  const title = buildCtrTitle(fix);
  const description = buildCtrDescription(fix);
  const ogTitle = buildOgTitle(fix);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      siteName: "Fix Error Help",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
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

function getRelatedFixes(currentCode, count = 3) {
  const list = Array.isArray(fixes) ? fixes : [];
  if (!list.length) return [];

  const idx = list.findIndex((f) => normalize(f?.slug) === normalize(currentCode));
  if (idx === -1) {
    return list
      .filter((f) => f?.slug && normalize(f.slug) !== normalize(currentCode))
      .slice(0, count);
  }

  const out = [];
  let step = 1;

  while (out.length < count && step < list.length + 5) {
    const plus = list[(idx + step) % list.length];
    const minus = list[(idx - step + list.length) % list.length];

    if (
      plus?.slug &&
      normalize(plus.slug) !== normalize(currentCode) &&
      !out.some((x) => x.slug === plus.slug)
    ) {
      out.push(plus);
      if (out.length >= count) break;
    }

    if (
      minus?.slug &&
      normalize(minus.slug) !== normalize(currentCode) &&
      !out.some((x) => x.slug === minus.slug)
    ) {
      out.push(minus);
      if (out.length >= count) break;
    }

    step += 1;
  }

  return out.slice(0, count);
}

function getContextualLinks(currentCode, count = 3) {
  const related = getRelatedFixes(currentCode, count);
  if (related.length >= count) return related;

  const existing = new Set(related.map((item) => item.slug));
  const extras = (Array.isArray(fixes) ? fixes : [])
    .filter((f) => f?.slug && normalize(f.slug) !== normalize(currentCode) && !existing.has(f.slug))
    .slice(0, count - related.length);

  return [...related, ...extras].slice(0, count);
}

function ContextualInternalLinks({ currentSlug }) {
  const links = getContextualLinks(currentSlug, 3);

  if (!links.length) return null;

  return (
    <section className="section">
      <h2>Other Windows Errors You May Also Need to Fix</h2>
      <p>
        Windows problems often come in clusters. If this error appeared during an update,
        install, activation attempt, or repair process, these related guides may help you
        troubleshoot the next issue faster.
      </p>
      <ul>
        {links.map((fix) => (
          <li key={`contextual-${fix.slug}`}>
            <a href={`/fix/${fix.slug}`}>{fix.title || `Fix ${fix.slug}`}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function findFixSmart(rawCode) {
  const requested = normalize(rawCode);

  const candidates = [
    requested,
    requested.startsWith("0x") ? requested.slice(2) : requested,
    requested.startsWith("0x") ? requested : `0x${requested}`,
  ].filter(Boolean);

  const fix = fixes.find((f) => candidates.includes(normalize(f.slug)));
  return { fix, requested };
}

export default async function FixPage({ params }) {
  const { code } = await params;
  const { fix, requested } = findFixSmart(code);

  if (fix) {
    const canonical = normalize(fix.slug);
    if (requested !== canonical) {
      redirect(`/fix/${fix.slug}`);
    }
  }

  if (!fix) {
    const slugs = (Array.isArray(fixes) ? fixes : [])
      .map((f) => f?.slug)
      .filter(Boolean)
      .slice(0, 30);

    return (
      <main className="container">
        <BreadcrumbJsonLd code={code} titleForCrumb={`Fix ${code}`} />

        <article className="article">
          <header className="articleHeader">
            <h1>We don’t have this fix yet</h1>
            <p className="lead">
              You tried: <strong>{code}</strong>
            </p>
            <p className="lead">
              This page renders when <code>fixes.ts</code> does not contain a matching{" "}
              <code>slug</code>.
            </p>
          </header>

          <section className="section">
            <h2>First 30 slugs currently loaded</h2>
            <ul>
              {slugs.map((s) => (
                <li key={s}>
                  <a href={`/fix/${s}`}>{s}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <p>
              Go back to the homepage: <a href="/">Home</a>
            </p>
          </section>
        </article>
      </main>
    );
  }

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

  const affiliateHref =
    (fix?.affiliateCallout?.href && String(fix.affiliateCallout.href).trim()) ||
    WINDOWS_REPAIR_AFFILIATE_LINK;

  const showUniversalFaq = true;
  const relatedFixes = getRelatedFixes(fix.slug, 3);

  if (normalize(fix.slug) === "0x80070422") {
    return (
      <main className="container">
        <BreadcrumbJsonLd code={fix.slug} titleForCrumb="How to Fix Windows Error 0x80070422" />

        <article className="article">
          <header className="articleHeader">
            <h1>How to Fix Windows Error 0x80070422</h1>

            <p className="lead">
              Windows error <strong>0x80070422</strong> usually appears when the{" "}
              <strong>Windows Update</strong> service is disabled or not running.
              This prevents updates, security patches, and feature installs from completing successfully.
            </p>

            <p className="lead">
              Start with the free steps below. If it still isn’t fixed, use the “If the error still persists”
              section near the bottom.
            </p>
          </header>

          <section className="section">
            <h2>Method 1: Enable the Windows Update Service</h2>

            <ol className="steps">
              <li>
                Press <strong>Windows + R</strong>, type <code>services.msc</code>, and press Enter.
              </li>
              <li>Find <strong>Windows Update</strong> in the list.</li>
              <li>
                Double-click it. Set <strong>Startup type</strong> to <strong>Automatic</strong>.
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
              If enabling the service didn’t work, Windows Update components may be stuck or corrupted. This reset is safe
              and commonly fixes <strong>0x80070422</strong>.
            </p>

            <ol className="steps">
              <li>
                Open <strong>Command Prompt</strong> as Administrator:
                <ul>
                  <li>Click Start and type <strong>cmd</strong></li>
                  <li>
                    Right-click <strong>Command Prompt</strong> → <strong>Run as administrator</strong>
                  </li>
                </ul>
              </li>
              <li>Run these commands one at a time:</li>
            </ol>

            <CopyCodeBlock
              label="Windows Update reset commands"
              language="cmd"
              code={`net stop wuauserv
net stop bits
net stop cryptsvc
net stop msiserver

ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old
ren C:\\Windows\\System32\\catroot2 catroot2.old

net start wuauserv
net start bits
net start cryptsvc
net start msiserver`}
            />

            <p>Restart your PC and try Windows Update again.</p>
          </section>

          <ContextualInternalLinks currentSlug={fix.slug} />

          <section className="section">
            <h2>Related Windows Errors</h2>
            <p>If Windows Update is failing with multiple errors, these related guides may also help:</p>
            <ul>
              <li>
                <a href="/fix/0x80070424">
                  Fix Windows error 0x80070424 (Windows Update service missing)
                </a>
              </li>
              <li>
                <a href="/fix/0x80070005">Fix Windows error 0x80070005 (Access Denied)</a>
              </li>
              <li>
                <a href="/fix/0x800f081f">Fix Windows error 0x800f081f (Update component missing)</a>
              </li>
            </ul>
          </section>

          <section className="section callout">
            <h2>If the Error Still Persists</h2>

            <p>
              If system files or update components are damaged, manual steps may not fully resolve{" "}
              <strong>0x80070422</strong>.
            </p>

            <p>
              In that case, an automated Windows repair tool can scan for common causes like broken update services and
              corrupted system files.
            </p>

            <div className="ctaRow">
              <div className="ctaLabel">Recommended option</div>
              <a className="ctaButton" href={affiliateHref} target="_blank" rel="nofollow sponsored noopener">
                Fix Windows Update errors automatically
              </a>

              <OutbytePolicyLinks />

              <p className="note">
                Disclosure: We may earn a commission if you purchase through this link (at no extra cost to you).
              </p>
            </div>
          </section>

          <section className="section">
            <h2>Frequently Asked Questions</h2>

            <h3>What causes error 0x80070422?</h3>
            <p>
              Most commonly it’s caused by the Windows Update service being disabled. It can also be caused by corrupted
              update components or system files.
            </p>

            <h3>Is error 0x80070422 dangerous?</h3>
            <p>The error itself isn’t dangerous, but it can prevent security updates from installing.</p>

            <h3>Can this error fix itself?</h3>
            <p>Sometimes a restart or re-enabling services fixes it. If it keeps returning, use the steps above.</p>
          </section>
        </article>
      </main>
    );
  }

  return (
    <main className="container">
      <BreadcrumbJsonLd code={fix.slug} titleForCrumb={fix?.title || `Fix ${fix.slug}`} />

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
            {Array.isArray(fix.tryFirst)
              ? fix.tryFirst.map((item, idx) => <li key={`tryfirst-${idx}`}>{item}</li>)
              : null}
          </ol>
        </section>

        <section className="section">
          <h2>Advanced steps</h2>
          <ol className="steps">
            {Array.isArray(fix.advanced)
              ? fix.advanced.map((item, idx) => <li key={`advanced-${idx}`}>{item}</li>)
              : null}
          </ol>
        </section>

        <ContextualInternalLinks currentSlug={fix.slug} />

        {hasScriptSection ? (
          <section className="section">
            <h2>{fix.scriptSection.title || "Commands to Try"}</h2>
            {fix.scriptSection.intro ? <p>{fix.scriptSection.intro}</p> : null}
            {fix.scriptSection.stepsIntro ? <p>{fix.scriptSection.stepsIntro}</p> : null}

            <CopyCodeBlock
              label={fix.scriptSection.title || "Commands to Try"}
              language="cmd"
              code={fix.scriptSection.code}
            />

            {fix.scriptSection.outro ? <p>{fix.scriptSection.outro}</p> : null}
          </section>
        ) : null}

        {Array.isArray(relatedFixes) && relatedFixes.length ? (
          <section className="section">
            <h2>Related Windows Errors</h2>
            <p>If you’re seeing multiple errors, these related guides may also help:</p>
            <ul>
              {relatedFixes.map((rf) => (
                <li key={`related-${rf.slug}`}>
                  <a href={`/fix/${rf.slug}`}>{rf.title || `Fix ${rf.slug}`}</a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {hasAffiliateCallout ? (
          <section className="section callout">
            <h2>{fix.affiliateCallout.title || "If the Error Still Persists"}</h2>

            {Array.isArray(fix.affiliateCallout.body)
              ? fix.affiliateCallout.body.map((p, idx) => <p key={`body-${idx}`}>{p}</p>)
              : fix.affiliateCallout.body
              ? <p>{fix.affiliateCallout.body}</p>
              : null}

            <div className="ctaRow">
              <div className="ctaLabel">Recommended option</div>
              <a className="ctaButton" href={affiliateHref} target="_blank" rel="nofollow sponsored noopener">
                {fix.affiliateCallout.ctaText}
              </a>

              <OutbytePolicyLinks />

              {fix.affiliateCallout.note ? <p className="note">{fix.affiliateCallout.note}</p> : null}
            </div>
          </section>
        ) : null}

        {showUniversalFaq ? (
          <section className="section">
            <h2>Frequently Asked Questions</h2>

            <h3>What causes error {fix.slug}?</h3>
            <p>
              This error usually occurs when a required Windows component, service, or system file is not working
              correctly. It may be caused by corrupted system files, disabled services, failed updates, or software
              conflicts.
            </p>

            <h3>Is error {fix.slug} dangerous?</h3>
            <p>
              The error itself is not dangerous, but it can prevent Windows features, updates, or applications from
              working properly. If ignored, it may lead to stability or security issues over time.
            </p>

            <h3>Can error {fix.slug} be fixed without reinstalling Windows?</h3>
            <p>
              Yes. In most cases, this error can be resolved using troubleshooting steps such as repairing system files,
              enabling required services, or using automated repair tools, without needing to reinstall Windows.
            </p>
          </section>
        ) : null}
      </article>
    </main>
  );
}
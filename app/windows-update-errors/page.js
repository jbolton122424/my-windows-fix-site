import { fixes } from "../fixes";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixerrorhelp.com").replace(
  /\/$/,
  ""
);

function normalize(raw) {
  try {
    return decodeURIComponent(String(raw || "")).trim().toLowerCase();
  } catch {
    return String(raw || "").trim().toLowerCase();
  }
}

function isWindowsUpdateFix(fix) {
  const source = `${fix?.title || ""} ${fix?.description || ""} ${fix?.whatItMeans || ""}`.toLowerCase();

  return (
    source.includes("windows update") ||
    source.includes("update service") ||
    source.includes("update cache") ||
    source.includes("servicing") ||
    source.includes("component store") ||
    source.includes("bits")
  );
}

function getWindowsUpdateFixes() {
  return (Array.isArray(fixes) ? fixes : []).filter((fix) => fix?.slug && isWindowsUpdateFix(fix));
}

export const metadata = {
  title: "Windows Update Errors",
  description:
    "Browse step-by-step fixes for common Windows Update errors, including 0x8024401c, 0x80070020, 0x80070652, 0x80070424, download failures, corrupted update cache, and service problems.",
  alternates: {
    canonical: `${SITE_URL}/windows-update-errors`,
  },
  openGraph: {
    title: "Windows Update Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows Update errors, including 0x8024401c, 0x80070020, 0x80070652, 0x80070424, download failures, corrupted update cache, and service problems.",
    url: `${SITE_URL}/windows-update-errors`,
    siteName: "Fix Error Help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Windows Update Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows Update errors, including 0x8024401c, 0x80070020, 0x80070652, 0x80070424, download failures, corrupted update cache, and service problems.",
  },
};

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Windows Update Errors",
        item: `${SITE_URL}/windows-update-errors`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function CollectionJsonLd({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Windows Update Errors",
    url: `${SITE_URL}/windows-update-errors`,
    description:
      "Step-by-step fixes for common Windows Update errors, including corrupted cache, service failures, connection problems, and servicing stack issues.",
    hasPart: items.map((fix) => ({
      "@type": "WebPage",
      name: fix.title || `Fix ${fix.slug}`,
      url: `${SITE_URL}/fix/${fix.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function WindowsUpdateErrorsPage() {
  const updateFixes = getWindowsUpdateFixes();
  const featuredSlugs = ["0x8024401c", "0x80070020", "0x80070652", "0x80070424", "0x8024402f"];
  const featuredFixes = featuredSlugs
    .map((slug) => updateFixes.find((fix) => normalize(fix.slug) === normalize(slug)))
    .filter(Boolean);

  return (
    <main className="container">
      <BreadcrumbJsonLd />
      <CollectionJsonLd items={updateFixes} />

      <article className="article">
        <header className="articleHeader">
          <h1>Windows Update Errors</h1>

          <p className="lead">
            Browse step-by-step fixes for common <strong>Windows Update errors</strong>, including
            download failures, update service problems, corrupted cache issues, servicing/component
            store errors, and connection-related update failures.
          </p>

          <p className="lead">
            If Windows Update is failing with a specific code, start with the guide for that exact
            error first. Many update failures share the same root causes, but the exact code usually
            points to the fastest first fix.
          </p>
        </header>

        <section className="section callout">
          <h2>Common signs you’re dealing with a Windows Update issue</h2>
          <ul>
            <li>Updates download but fail during install</li>
            <li>Windows Update gets stuck checking for updates</li>
            <li>You see repeated retry loops, timeout messages, or connection failures</li>
            <li>Windows reports corrupted update files or missing components</li>
            <li>Update services are disabled, missing, or not starting correctly</li>
          </ul>
        </section>

        <section className="section">
          <h2>How to use this page</h2>
          <p>
            Choose the guide that matches your exact error code. Many Windows Update failures are
            caused by the same underlying issues, such as a damaged update cache, broken services,
            corrupted system files, installer conflicts, or connectivity problems.
          </p>
          <p>
            If one guide does not fully solve the problem, check the related error pages in the same
            Windows Update cluster before moving on to broader repair steps.
          </p>
        </section>

        <section className="section">
          <h2>Featured Windows Update fixes</h2>

          {featuredFixes.length ? (
            <ul>
              {featuredFixes.map((fix) => (
                <li key={fix.slug}>
                  <a href={`/fix/${fix.slug}`}>{fix.title || `Fix ${fix.slug}`}</a>
                  {fix.description ? ` — ${fix.description}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No featured Windows Update guides are available yet.</p>
          )}
        </section>

        <section className="section">
          <h2>Windows Update error code guides</h2>

          {updateFixes.length ? (
            <ul>
              {updateFixes.map((fix) => (
                <li key={fix.slug}>
                  <a href={`/fix/${fix.slug}`}>{fix.title || `Fix ${fix.slug}`}</a>
                  {fix.description ? ` — ${fix.description}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No Windows Update guides are available yet.</p>
          )}
        </section>

        <section className="section">
          <h2>Most common causes of Windows Update errors</h2>
          <ul>
            <li>Corrupted SoftwareDistribution or Catroot2 update cache folders</li>
            <li>Disabled, missing, or unstable Windows Update services</li>
            <li>Damaged system files or component store corruption</li>
            <li>DNS, proxy, VPN, firewall, or network filtering problems</li>
            <li>Driver, installer, or background software conflicts blocking updates</li>
          </ul>
        </section>

        <section className="section">
          <h2>Best first fixes to try</h2>
          <ol className="steps">
            <li>Restart your PC and run Windows Update again.</li>
            <li>Run the Windows Update Troubleshooter.</li>
            <li>Disable VPN or Proxy temporarily.</li>
            <li>Repair system files with DISM and SFC if update errors keep returning.</li>
            <li>Reset Windows Update components if downloads or installs appear stuck.</li>
          </ol>
        </section>

        <section className="section">
          <h2>Popular Windows Update errors on this site</h2>
          <p>
            Some of the most common update-related guides here include{" "}
            <a href="/fix/0x8024401c">0x8024401c</a>,{" "}
            <a href="/fix/0x80070020">0x80070020</a>,{" "}
            <a href="/fix/0x80070652">0x80070652</a>,{" "}
            <a href="/fix/0x80070424">0x80070424</a>, and{" "}
            <a href="/fix/0x8024402f">0x8024402f</a>.
          </p>
          <p>
            These pages cover several of the most common Windows Update failure patterns: blocked
            connections, locked update files, stuck installer states, missing update services, and
            interrupted downloads.
          </p>
        </section>
      </article>
    </main>
  );
}
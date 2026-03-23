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
    "Browse step-by-step fixes for common Windows Update errors, including download failures, corrupted update cache, servicing problems, and connection issues.",
  alternates: {
    canonical: `${SITE_URL}/windows-update-errors`,
  },
  openGraph: {
    title: "Windows Update Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows Update errors, including download failures, corrupted update cache, servicing problems, and connection issues.",
    url: `${SITE_URL}/windows-update-errors`,
    siteName: "Fix Error Help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Windows Update Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows Update errors, including download failures, corrupted update cache, servicing problems, and connection issues.",
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

  return (
    <main className="container">
      <BreadcrumbJsonLd />
      <CollectionJsonLd items={updateFixes} />

      <article className="article">
        <header className="articleHeader">
          <h1>Windows Update Errors</h1>

          <p className="lead">
            This page collects step-by-step fixes for common <strong>Windows Update errors</strong>,
            including download failures, update service problems, corrupted cache issues, and
            servicing/component store errors.
          </p>

          <p className="lead">
            If Windows Update is failing with more than one code, start with the guide that matches
            your exact error first, then check the related errors in the same cluster.
          </p>
        </header>

        <section className="section callout">
          <h2>Common signs you’re dealing with a Windows Update issue</h2>
          <ul>
            <li>Updates download but fail during install</li>
            <li>Windows Update gets stuck checking for updates</li>
            <li>You see repeated retry loops or timeout errors</li>
            <li>Windows reports corrupted update files or missing components</li>
            <li>Update services are disabled, missing, or not starting correctly</li>
          </ul>
        </section>

        <section className="section">
          <h2>How to use this page</h2>
          <p>
            Choose the guide that matches your exact error code. Many Windows Update failures are
            caused by the same underlying issues, such as a damaged update cache, broken services,
            corrupted system files, or connectivity problems.
          </p>
          <p>
            If one fix does not fully solve the problem, check the related error guides near the
            bottom of that page to continue troubleshooting within the same topic cluster.
          </p>
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
            <li>Disabled or unstable Windows Update services</li>
            <li>Damaged system files or component store corruption</li>
            <li>DNS, proxy, VPN, or firewall/network filtering problems</li>
            <li>Driver or installer conflicts blocking updates</li>
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
      </article>
    </main>
  );
}
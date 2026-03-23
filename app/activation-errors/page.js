import { fixes } from "../fixes";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixerrorhelp.com").replace(
  /\/$/,
  ""
);

function isActivationFix(fix) {
  const source = `${fix?.title || ""} ${fix?.description || ""} ${fix?.whatItMeans || ""}`.toLowerCase();

  return (
    source.includes("activation") ||
    source.includes("license") ||
    source.includes("digital license") ||
    source.includes("product key") ||
    source.includes("kms")
  );
}

function getActivationFixes() {
  return (Array.isArray(fixes) ? fixes : []).filter((fix) => fix?.slug && isActivationFix(fix));
}

export const metadata = {
  title: "Activation Errors",
  description:
    "Browse step-by-step fixes for common Windows activation errors, including invalid keys, blocked licenses, missing digital licenses, and KMS connectivity problems.",
  alternates: {
    canonical: `${SITE_URL}/activation-errors`,
  },
  openGraph: {
    title: "Activation Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows activation errors, including invalid keys, blocked licenses, missing digital licenses, and KMS connectivity problems.",
    url: `${SITE_URL}/activation-errors`,
    siteName: "Fix Error Help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Activation Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows activation errors, including invalid keys, blocked licenses, missing digital licenses, and KMS connectivity problems.",
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
        name: "Activation Errors",
        item: `${SITE_URL}/activation-errors`,
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
    name: "Activation Errors",
    url: `${SITE_URL}/activation-errors`,
    description:
      "Step-by-step fixes for common Windows activation errors, including blocked product keys, missing digital licenses, and KMS connectivity problems.",
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

export default function ActivationErrorsPage() {
  const activationFixes = getActivationFixes();

  return (
    <main className="container">
      <BreadcrumbJsonLd />
      <CollectionJsonLd items={activationFixes} />

      <article className="article">
        <header className="articleHeader">
          <h1>Activation Errors</h1>

          <p className="lead">
            This page collects step-by-step fixes for common <strong>Windows activation errors</strong>,
            including invalid product keys, blocked licenses, missing digital licenses, and
            KMS-related connectivity problems.
          </p>

          <p className="lead">
            If Windows will not activate after a hardware change, reinstall, or key entry,
            start with the guide that matches your exact error code first.
          </p>
        </header>

        <section className="section callout">
          <h2>Common signs you’re dealing with an activation issue</h2>
          <ul>
            <li>Windows says your product key is invalid</li>
            <li>You see a blocked or already used key message</li>
            <li>Your digital license is missing after hardware changes</li>
            <li>Windows cannot contact the KMS server</li>
            <li>Activation troubleshooter cannot complete successfully</li>
          </ul>
        </section>

        <section className="section">
          <h2>How to use this page</h2>
          <p>
            Choose the guide that matches the exact activation code you see. Activation
            failures often come from the same underlying issues, such as edition mismatch,
            blocked product keys, missing digital licenses, or network problems reaching a
            licensing server.
          </p>
          <p>
            If the error appeared after changing hardware or reinstalling Windows, check whether
            your license type is transferable and whether it is linked to your Microsoft account.
          </p>
        </section>

        <section className="section">
          <h2>Activation error code guides</h2>

          {activationFixes.length ? (
            <ul>
              {activationFixes.map((fix) => (
                <li key={fix.slug}>
                  <a href={`/fix/${fix.slug}`}>{fix.title || `Fix ${fix.slug}`}</a>
                  {fix.description ? ` — ${fix.description}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No activation guides are available yet.</p>
          )}
        </section>

        <section className="section">
          <h2>Most common causes of activation errors</h2>
          <ul>
            <li>Product key does not match the installed Windows edition</li>
            <li>Digital license is not linked or no longer available after hardware changes</li>
            <li>Blocked or already-used product key</li>
            <li>Incorrect system time or network issues during activation</li>
            <li>KMS server or organizational licensing connectivity problems</li>
          </ul>
        </section>

        <section className="section">
          <h2>Best first fixes to try</h2>
          <ol className="steps">
            <li>Restart your PC and retry activation.</li>
            <li>Confirm the installed Windows edition matches your key or license.</li>
            <li>Run the Activation Troubleshooter.</li>
            <li>Sign in with the Microsoft account linked to your license.</li>
            <li>Check date, time, and network connectivity before deeper fixes.</li>
          </ol>
        </section>
      </article>
    </main>
  );
}
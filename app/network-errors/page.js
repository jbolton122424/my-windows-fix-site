import { fixes } from "../fixes";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fixerrorhelp.com").replace(
  /\/$/,
  ""
);

function isNetworkFix(fix) {
  const source = `${fix?.title || ""} ${fix?.description || ""} ${fix?.whatItMeans || ""}`.toLowerCase();

  return (
    source.includes("network") ||
    source.includes("dns") ||
    source.includes("proxy") ||
    source.includes("vpn") ||
    source.includes("winsock") ||
    source.includes("connection") ||
    source.includes("server failed") ||
    source.includes("mail server") ||
    source.includes("outlook")
  );
}

function getNetworkFixes() {
  return (Array.isArray(fixes) ? fixes : []).filter((fix) => fix?.slug && isNetworkFix(fix));
}

export const metadata = {
  title: "Network Errors",
  description:
    "Browse step-by-step fixes for common Windows network errors, including DNS failures, proxy or VPN issues, interrupted connections, Outlook connectivity problems, and server communication failures.",
  alternates: {
    canonical: `${SITE_URL}/network-errors`,
  },
  openGraph: {
    title: "Network Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows network errors, including DNS failures, proxy or VPN issues, interrupted connections, Outlook connectivity problems, and server communication failures.",
    url: `${SITE_URL}/network-errors`,
    siteName: "Fix Error Help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Errors | Fix Error Help",
    description:
      "Browse step-by-step fixes for common Windows network errors, including DNS failures, proxy or VPN issues, interrupted connections, Outlook connectivity problems, and server communication failures.",
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
        name: "Network Errors",
        item: `${SITE_URL}/network-errors`,
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
    name: "Network Errors",
    url: `${SITE_URL}/network-errors`,
    description:
      "Step-by-step fixes for common Windows network errors, including DNS problems, proxy and VPN conflicts, interrupted connections, and Outlook connectivity failures.",
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

export default function NetworkErrorsPage() {
  const networkFixes = getNetworkFixes();

  return (
    <main className="container">
      <BreadcrumbJsonLd />
      <CollectionJsonLd items={networkFixes} />

      <article className="article">
        <header className="articleHeader">
          <h1>Network Errors</h1>

          <p className="lead">
            This page collects step-by-step fixes for common <strong>Windows network errors</strong>,
            including DNS failures, proxy and VPN problems, interrupted connections, Outlook
            server timeouts, and Windows services that cannot reach Microsoft servers.
          </p>

          <p className="lead">
            If Windows Update, Outlook, Microsoft services, or shared network resources keep
            failing to connect, start with the guide that matches your exact error code first.
          </p>
        </header>

        <section className="section callout">
          <h2>Common signs you’re dealing with a network issue</h2>
          <ul>
            <li>Windows cannot reach Microsoft update or activation servers</li>
            <li>DNS lookups fail or websites/services stop resolving correctly</li>
            <li>VPN or proxy settings are blocking connections</li>
            <li>Outlook times out or loses connection during send/receive</li>
            <li>Windows reports interrupted or terminated server communication</li>
          </ul>
        </section>

        <section className="section">
          <h2>How to use this page</h2>
          <p>
            Choose the guide that matches the exact error code you see. Many network-related
            Windows errors come from the same root causes, such as unstable DNS, blocked traffic,
            proxy or VPN conflicts, firewall filtering, or broken Winsock and TCP/IP settings.
          </p>
          <p>
            If one fix does not fully solve the problem, open the related error guides inside that
            page to continue troubleshooting within the same network cluster.
          </p>
        </section>

        <section className="section">
          <h2>Network error code guides</h2>

          {networkFixes.length ? (
            <ul>
              {networkFixes.map((fix) => (
                <li key={fix.slug}>
                  <a href={`/fix/${fix.slug}`}>{fix.title || `Fix ${fix.slug}`}</a>
                  {fix.description ? ` — ${fix.description}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No network guides are available yet.</p>
          )}
        </section>

        <section className="section">
          <h2>Most common causes of Windows network errors</h2>
          <ul>
            <li>DNS resolution problems</li>
            <li>Proxy, VPN, or firewall interference</li>
            <li>Broken Winsock or TCP/IP stack settings</li>
            <li>Security software filtering connections</li>
            <li>Server timeouts or unstable internet connectivity</li>
          </ul>
        </section>

        <section className="section">
          <h2>Best first fixes to try</h2>
          <ol className="steps">
            <li>Restart your PC and networking equipment.</li>
            <li>Disable VPN or Proxy temporarily.</li>
            <li>Flush DNS and reset Winsock if the connection still fails.</li>
            <li>Check firewall or antivirus filtering if Microsoft services cannot connect.</li>
            <li>Try the same action on another network if possible.</li>
          </ol>
        </section>
      </article>
    </main>
  );
}
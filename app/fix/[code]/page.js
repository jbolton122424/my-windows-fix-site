// app/fix/[code]/page.js
import CopyCodeBlock from "../../components/CopyCodeBlock";
import AffiliateCtaButton from "../../components/AffiliateCtaButton";
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

function getFixCategory(fix) {
  const source = `${fix?.title || ""} ${fix?.description || ""} ${fix?.whatItMeans || ""}`.toLowerCase();

  if (source.includes("activation") || source.includes("license") || source.includes("kms")) {
    return "activation";
  }

  if (
    source.includes("windows update") ||
    source.includes("update service") ||
    source.includes("update cache") ||
    source.includes("bits") ||
    source.includes("servicing") ||
    source.includes("component store")
  ) {
    return "update";
  }

  if (source.includes("store") || source.includes("wsreset")) {
    return "store";
  }

  if (
    source.includes("outlook") ||
    source.includes("mail server") ||
    source.includes("pst") ||
    source.includes("ost") ||
    source.includes("email")
  ) {
    return "outlook";
  }

  if (
    source.includes("network") ||
    source.includes("internet") ||
    source.includes("dns") ||
    source.includes("proxy") ||
    source.includes("vpn") ||
    source.includes("winsock") ||
    source.includes("server failed") ||
    source.includes("connection")
  ) {
    return "network";
  }

  if (source.includes("driver") || source.includes("upgrade") || source.includes("feature update")) {
    return "upgrade";
  }

  if (
    source.includes("install failed") ||
    source.includes("installer") ||
    source.includes("installation") ||
    source.includes("msi")
  ) {
    return "install";
  }

  if (
    source.includes("dll") ||
    source.includes("module") ||
    source.includes("missing") ||
    source.includes("rpc") ||
    source.includes("class not registered") ||
    source.includes("interface")
  ) {
    return "system";
  }

  return "general";
}

function getCategoryLabel(category) {
  switch (category) {
    case "update":
      return "Windows Update";
    case "activation":
      return "Activation";
    case "store":
      return "Microsoft Store";
    case "network":
      return "Network";
    case "outlook":
      return "Outlook";
    case "upgrade":
      return "Upgrade and driver";
    case "install":
      return "Install";
    case "system":
      return "System file and component";
    default:
      return "Windows";
  }
}

function getIssuePhrase(fix) {
  const category = getFixCategory(fix);

  if (category === "activation") return "Windows activation problems";
  if (category === "update") return "Windows Update problems";
  if (category === "store") return "Microsoft Store problems";
  if (category === "network") return "Windows network problems";
  if (category === "install") return "Windows install problems";
  if (category === "system") return "missing Windows file issues";
  if (category === "upgrade") return "Windows upgrade problems";

  return "common Windows problems";
}

function getTopCtaText(fix) {
  return `Scan for problems causing ${fix?.slug || "this Windows error"}`;
}

function getBottomCtaText(fix) {
  const category = getFixCategory(fix);

  if (category === "activation") return "Repair Windows activation issues automatically";
  if (category === "update") return "Fix Windows Update errors automatically";
  if (category === "store") return "Fix Microsoft Store errors automatically";
  if (category === "network") return "Repair Windows network issues automatically";
  if (category === "install") return "Repair Windows install issues automatically";
  if (category === "system") return "Fix missing Windows file issues automatically";
  if (category === "upgrade") return "Fix Windows upgrade issues automatically";

  return `Repair Windows issues linked to ${fix?.slug || "this error"}`;
}

function shouldUseCustomBottomCta(fix) {
  const text = String(fix?.affiliateCallout?.ctaText || "").trim().toLowerCase();
  if (!text) return false;

  const tooGenericPhrases = [
    "fix common windows system issues automatically",
    "scan and repair windows automatically",
    "fix windows problems automatically",
    "repair windows automatically",
    "fix this error automatically",
  ];

  return !tooGenericPhrases.includes(text);
}

function getResolvedBottomCtaText(fix) {
  if (shouldUseCustomBottomCta(fix)) {
    return fix.affiliateCallout.ctaText;
  }

  return getBottomCtaText(fix);
}

function getBottomBodyParagraphs(fix) {
  if (Array.isArray(fix?.affiliateCallout?.body) && fix.affiliateCallout.body.length) {
    return fix.affiliateCallout.body;
  }

  if (fix?.affiliateCallout?.body) {
    return [fix.affiliateCallout.body];
  }

  return [
    `If ${fix?.slug || "this error"} is still appearing after the steps above, the problem may involve deeper system corruption, broken services, or missing Windows components.`,
    "An automated repair scan can check for those issues and may save time before you continue with more manual troubleshooting.",
  ];
}

function tokenizeFixText(fix) {
  const source = `${fix?.title || ""} ${fix?.description || ""} ${fix?.whatItMeans || ""}`.toLowerCase();

  return Array.from(
    new Set(
      source
        .replace(/0x[a-f0-9]+/gi, " ")
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length >= 4)
        .filter((word) => !["windows", "error", "common", "during", "caused", "usually", "repair"].includes(word))
    )
  );
}

function scoreFixRelation(currentFix, candidateFix) {
  if (!currentFix || !candidateFix) return -1;
  if (normalize(currentFix.slug) === normalize(candidateFix.slug)) return -1;

  let score = 0;

  const currentCategory = getFixCategory(currentFix);
  const candidateCategory = getFixCategory(candidateFix);

  if (currentCategory === candidateCategory) {
    score += 100;
  }

  const currentText = `${currentFix?.title || ""} ${currentFix?.description || ""} ${currentFix?.whatItMeans || ""}`.toLowerCase();
  const candidateText = `${candidateFix?.title || ""} ${candidateFix?.description || ""} ${candidateFix?.whatItMeans || ""}`.toLowerCase();

  const currentTokens = tokenizeFixText(currentFix);
  const candidateTokens = tokenizeFixText(candidateFix);

  currentTokens.forEach((token) => {
    if (candidateTokens.includes(token)) {
      score += 12;
    }
  });

  if (currentText.includes("windows update") && candidateText.includes("windows update")) score += 25;
  if (currentText.includes("activation") && candidateText.includes("activation")) score += 25;
  if (currentText.includes("store") && candidateText.includes("store")) score += 25;
  if (currentText.includes("outlook") && candidateText.includes("outlook")) score += 25;
  if (currentText.includes("driver") && candidateText.includes("driver")) score += 15;
  if (currentText.includes("network") && candidateText.includes("network")) score += 20;
  if (currentText.includes("proxy") && candidateText.includes("proxy")) score += 12;
  if (currentText.includes("vpn") && candidateText.includes("vpn")) score += 12;
  if (currentText.includes("dns") && candidateText.includes("dns")) score += 12;
  if (currentText.includes("winsock") && candidateText.includes("winsock")) score += 12;
  if (currentText.includes("softwaredistribution") && candidateText.includes("softwaredistribution")) score += 15;
  if (currentText.includes("component store") && candidateText.includes("component store")) score += 15;
  if (currentText.includes("dism") && candidateText.includes("dism")) score += 10;
  if (currentText.includes("sfc") && candidateText.includes("sfc")) score += 10;
  if (currentText.includes("bits") && candidateText.includes("bits")) score += 12;
  if (currentText.includes("license") && candidateText.includes("license")) score += 15;
  if (currentText.includes("server") && candidateText.includes("server")) score += 8;

  return score;
}

function getRelatedFixes(currentFix, count = 3) {
  const list = Array.isArray(fixes) ? fixes : [];
  if (!list.length || !currentFix?.slug) return [];

  const scored = list
    .filter((f) => f?.slug && normalize(f.slug) !== normalize(currentFix.slug))
    .map((f) => ({
      fix: f,
      score: scoreFixRelation(currentFix, f),
    }))
    .sort((a, b) => b.score - a.score);

  const topMatches = scored.slice(0, count).map((item) => item.fix);

  if (topMatches.length >= count) {
    return topMatches;
  }

  const existing = new Set(topMatches.map((item) => item.slug));
  const fallback = list
    .filter((f) => f?.slug && normalize(f.slug) !== normalize(currentFix.slug) && !existing.has(f.slug))
    .slice(0, count - topMatches.length);

  return [...topMatches, ...fallback].slice(0, count);
}

function getContextualLinks(currentFix, count = 3) {
  return getRelatedFixes(currentFix, count);
}

function getContextualSectionCopy(fix) {
  const category = getFixCategory(fix);
  const label = getCategoryLabel(category);

  if (category === "update") {
    return {
      heading: "Related Windows Update Errors",
      intro:
        "Windows Update problems often appear in clusters. These related update and servicing guides may help you troubleshoot the next issue faster.",
    };
  }

  if (category === "activation") {
    return {
      heading: "Related Activation Errors",
      intro:
        "Activation problems often overlap with licensing, edition, and connectivity issues. These related activation guides may help you narrow down the cause faster.",
    };
  }

  if (category === "store") {
    return {
      heading: "Related Microsoft Store Errors",
      intro:
        "Microsoft Store failures often share the same cache, sign-in, and component issues. These related Store guides may help if more than one app or download is failing.",
    };
  }

  if (category === "network") {
    return {
      heading: "Related Network Errors",
      intro:
        "Windows network problems often overlap with DNS, proxy, VPN, and connectivity issues. These related guides may help if the connection problem keeps returning.",
    };
  }

  if (category === "outlook") {
    return {
      heading: "Related Outlook Errors",
      intro:
        "Outlook send/receive problems often overlap with server settings, timeouts, and Windows networking issues. These related guides may help if mail keeps failing.",
    };
  }

  return {
    heading: `Other ${label} Errors You May Also Need to Fix`,
    intro:
      "Windows problems often come in clusters. These related guides may help you troubleshoot nearby issues faster if the same problem appears again.",
  };
}

function SmallDisclosure() {
  return (
    <p className="note" style={{ fontSize: "0.9rem", opacity: 0.78 }}>
      Disclosure: We may earn a commission if you purchase through this link.
    </p>
  );
}

function OutbytePolicyLinks() {
  return (
    <p className="ctaLinks" style={{ fontSize: "0.95rem", opacity: 0.85 }}>
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

function QuickRepairCallout({ href, fix }) {
  const issuePhrase = getIssuePhrase(fix);
  const ctaText = getTopCtaText(fix);

  return (
    <section className="section callout">
      <h2>Try the fastest fix for {fix.slug}</h2>
      <p>
        If you want to avoid working through manual repair steps first, you can start with an
        automated scan. It can check for corrupted system files, broken services, and other{" "}
        {issuePhrase.toLowerCase()} commonly tied to error <strong>{fix.slug}</strong>.
      </p>

      <div className="ctaRow">
        <div className="ctaLabel">Optional faster option</div>

        <AffiliateCtaButton href={href} placement="top" errorCode={fix.slug}>
          {ctaText}
        </AffiliateCtaButton>

        <p className="note">Manual fixes are listed below if you prefer to troubleshoot it yourself first.</p>

        <OutbytePolicyLinks />
        <SmallDisclosure />
      </div>
    </section>
  );
}

function MidPageRepairCallout({ href, fix }) {
  return (
    <section className="section callout">
      <h2>Want to skip the more advanced repair steps?</h2>
      <p>
        The next steps may involve deeper troubleshooting, system repair commands, or repeated
        testing. If you want to try a faster automated option before continuing, run a scan for{" "}
        <strong>{fix.slug}</strong> first.
      </p>

      <div className="ctaRow">
        <div className="ctaLabel">Before advanced fixes</div>

        <AffiliateCtaButton href={href} placement="mid" errorCode={fix.slug}>
          Try automated repair first
        </AffiliateCtaButton>

        <p className="note">
          Good option if you would rather avoid command-line work and longer manual troubleshooting.
        </p>

        <OutbytePolicyLinks />
        <SmallDisclosure />
      </div>
    </section>
  );
}

function PersistentRepairCallout({ href, fix, title, paragraphs, ctaText }) {
  return (
    <section className="section callout">
      <h2>{title || "Still not fixed? Try an automated repair scan"}</h2>

      {Array.isArray(paragraphs)
        ? paragraphs.map((p, idx) => <p key={`persistent-body-${idx}`}>{p}</p>)
        : null}

      <div className="ctaRow">
        <div className="ctaLabel">Recommended next step</div>

        <AffiliateCtaButton href={href} placement="bottom" errorCode={fix.slug}>
          {ctaText}
        </AffiliateCtaButton>

        <p className="note">
          Best if you want to try a faster repair path before spending more time on manual fixes.
        </p>

        <OutbytePolicyLinks />
        <SmallDisclosure />
      </div>
    </section>
  );
}

function ContextualInternalLinks({ currentFix }) {
  const links = getContextualLinks(currentFix, 3);

  if (!links.length) return null;

  const copy = getContextualSectionCopy(currentFix);

  return (
    <section className="section">
      <h2>{copy.heading}</h2>
      <p>{copy.intro}</p>
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

  const affiliateHref =
    (fix?.affiliateCallout?.href && String(fix.affiliateCallout.href).trim()) ||
    WINDOWS_REPAIR_AFFILIATE_LINK;

  const showUniversalFaq = true;
  const relatedFixes = getRelatedFixes(fix, 3);

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

          <QuickRepairCallout href={affiliateHref} fix={fix} />

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

          <MidPageRepairCallout href={affiliateHref} fix={fix} />

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

          <ContextualInternalLinks currentFix={fix} />

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

          <PersistentRepairCallout
            href={affiliateHref}
            fix={fix}
            title="Still seeing 0x80070422?"
            paragraphs={[
              "If the steps above did not solve the issue, the problem may involve broken update services, corrupted system files, or deeper Windows Update component issues.",
              "An automated repair scan can check for those problems and may save time before you continue with more manual troubleshooting.",
            ]}
            ctaText="Fix Windows Update errors automatically"
          />

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

        <QuickRepairCallout href={affiliateHref} fix={fix} />

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

        <MidPageRepairCallout href={affiliateHref} fix={fix} />

        <section className="section">
          <h2>Advanced steps</h2>
          <ol className="steps">
            {Array.isArray(fix.advanced)
              ? fix.advanced.map((item, idx) => <li key={`advanced-${idx}`}>{item}</li>)
              : null}
          </ol>
        </section>

        <ContextualInternalLinks currentFix={fix} />

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

        <PersistentRepairCallout
          href={affiliateHref}
          fix={fix}
          title={fix.affiliateCallout?.title || "Still not fixed? Try an automated repair scan"}
          paragraphs={getBottomBodyParagraphs(fix)}
          ctaText={getResolvedBottomCtaText(fix)}
        />

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
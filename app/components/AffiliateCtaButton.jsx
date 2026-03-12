"use client";

function safeString(value) {
  return String(value || "").trim();
}

export default function AffiliateCtaButton({
  href,
  children,
  placement = "unknown",
  errorCode = "",
  affiliateName = "outbyte",
  className = "ctaButton",
}) {
  function handleClick() {
    const eventParams = {
      affiliate_name: safeString(affiliateName),
      cta_placement: safeString(placement),
      error_code: safeString(errorCode),
      cta_text: safeString(children),
      destination_url: safeString(href),
      page_path:
        typeof window !== "undefined" ? safeString(window.location.pathname) : "",
    };

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", eventParams);
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "affiliate_click",
        ...eventParams,
      });
    }
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
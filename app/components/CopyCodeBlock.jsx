"use client";

import { useMemo, useState } from "react";

export default function CopyCodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    // Normalize to string, preserve newlines exactly
    return typeof code === "string" ? code : String(code ?? "");
  }, [code]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // Fallback for older browsers / blocked clipboard API
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      } catch (e) {
        // If everything fails, do nothing (no noisy alerts)
        console.error("Copy failed", err);
      }
    }
  }

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 8,
        }}
      >
        <button
          type="button"
          onClick={handleCopy}
          style={{
            cursor: "pointer",
            fontSize: 13,
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.03)",
            color: "rgba(0,0,0,0.8)",
          }}
          aria-label="Copy commands to clipboard"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="codeBlock">{text}</pre>
    </div>
  );
}

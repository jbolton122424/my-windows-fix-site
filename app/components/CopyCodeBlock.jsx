"use client";

import { useEffect, useMemo, useState } from "react";

export default function CopyCodeBlock({
  code = "",
  label = "Commands",
  language = "cmd",
}) {
  const [copied, setCopied] = useState(false);
  const [canClipboard, setCanClipboard] = useState(false);

  const normalizedCode = useMemo(() => {
    if (typeof code !== "string") return "";
    return code.replace(/\r\n/g, "\n").trimEnd();
  }, [code]);

  useEffect(() => {
    setCanClipboard(Boolean(navigator?.clipboard?.writeText));
  }, []);

  async function handleCopy() {
    try {
      const textToCopy = normalizedCode || "";

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const el = document.createElement("textarea");
        el.value = textToCopy;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      setCopied(true);
      window.clearTimeout(handleCopy._t);
      handleCopy._t = window.setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      setCopied(false);
      alert("Copy failed. Please manually select and copy the command.");
    }
  }

  const styles = {
    wrap: {
      margin: "28px 0",
      borderRadius: 18,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.10)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      background: "#fff",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "16px 18px",
      background: "#0b1220",
      color: "#fff",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
    },
    headerLeft: {
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    metaRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    },
    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: "rgba(255,255,255,0.10)",
      color: "rgba(255,255,255,0.92)",
    },
    title: {
      fontSize: 18,
      fontWeight: 800,
      lineHeight: 1.2,
      margin: 0,
    },
    helper: {
      fontSize: 13,
      lineHeight: 1.35,
      color: "rgba(255,255,255,0.85)",
      margin: 0,
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: "14px 18px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.25)",
      background: "#ffffff",
      color: "#0b1220",
      fontSize: 16,
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "0 10px 18px rgba(0,0,0,0.20)",
      userSelect: "none",
      whiteSpace: "nowrap",
    },
    buttonCopied: {
      background: "#34d399", // emerald
      border: "1px solid rgba(0,0,0,0.08)",
      color: "#062016",
    },
    codeWrap: {
      position: "relative",
      background: "#070a12",
    },
    code: {
      margin: 0,
      padding: "18px",
      overflowX: "auto",
      color: "rgba(255,255,255,0.92)",
      fontSize: 14,
      lineHeight: 1.55,
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
      padding: "12px 18px",
      background: "#f6f7fb",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      color: "#334155",
      fontSize: 13,
    },
    footerRight: {
      fontWeight: 700,
      color: "#475569",
    },
  };

  return (
    <section style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.metaRow}>
            <span style={styles.pill}>{language}</span>
          </div>

          <h3 style={styles.title}>{label}</h3>

          <p style={styles.helper}>
            Click <strong>Copy commands</strong>, then paste into{" "}
            <strong>Command Prompt (Admin)</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            ...styles.button,
            ...(copied ? styles.buttonCopied : null),
          }}
          aria-label="Copy commands"
          title={canClipboard ? "Copy commands" : "Copy (fallback)"}
        >
          <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>
            ⧉
          </span>
          {copied ? "Copied ✓" : "Copy commands"}
        </button>
      </div>

      <div style={styles.codeWrap}>
        <pre style={styles.code}>
          <code style={{ whiteSpace: "pre" }}>{normalizedCode}</code>
        </pre>
      </div>

      <div style={styles.footer}>
        <div>
          Tip: Paste in Command Prompt with <strong>Ctrl + V</strong> (or right-click).
        </div>
        <div style={styles.footerRight}>
          {canClipboard ? "Clipboard ready" : "Clipboard fallback"}
        </div>
      </div>
    </section>
  );
}
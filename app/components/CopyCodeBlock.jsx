"use client";

import { useMemo, useState } from "react";

export default function CopyCodeBlock({
  code = "",
  label = "Commands",
  language = "cmd",
}) {
  const [copied, setCopied] = useState(false);

  const normalizedCode = useMemo(() => {
    if (typeof code !== "string") return "";
    return code.replace(/\r\n/g, "\n").trimEnd();
  }, [code]);

  async function handleCopy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(normalizedCode);
      } else {
        const el = document.createElement("textarea");
        el.value = normalizedCode;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed. Please manually copy the command.");
    }
  }

  const styles = {
    wrap: {
      margin: "28px 0",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.1)",
      background: "#fff",
      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 18px",
      background: "#0f172a",
      color: "#fff",
    },

    title: {
      fontSize: 16,
      fontWeight: 700,
    },

    pill: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      background: "rgba(255,255,255,0.15)",
      padding: "4px 8px",
      borderRadius: 6,
      marginLeft: 10,
    },

    button: {
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 700,
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      background: "#fff",
      color: "#0f172a",
    },

    copied: {
      background: "#34d399",
      color: "#062016",
    },

    codeWrap: {
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
      padding: "10px 18px",
      fontSize: 13,
      background: "#f1f5f9",
      borderTop: "1px solid rgba(0,0,0,0.08)",
    },
  };

  return (
    <section style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.title}>
          {label} <span style={styles.pill}>{language}</span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            ...styles.button,
            ...(copied ? styles.copied : null),
          }}
        >
          {copied ? "Copied ✓" : "Copy commands"}
        </button>
      </div>

      <div style={styles.codeWrap}>
        <pre style={styles.code}>
          <code>{normalizedCode}</code>
        </pre>
      </div>

      <div style={styles.footer}>
        Tip: Paste into Command Prompt with <strong>Ctrl + V</strong>
      </div>
    </section>
  );
}
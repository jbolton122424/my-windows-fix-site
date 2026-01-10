// app/fixes.ts
export const fixes = [
  {
    slug: "0x80070422",
    title: "Fix 0x80070422",
    description: "Windows Update service is disabled or not running.",
    whatItMeans:
      "This error commonly appears when Windows Update is turned off or a required update service is stopped.",
    tryFirst: [
      "Restart your PC (quickly clears temporary service failures).",
      "Check that Windows Update is enabled in Services (services.msc).",
      "Run Windows Update again after enabling the service.",
    ],
    advanced: [
      "Run the Windows Update Troubleshooter (Settings → System → Troubleshoot).",
      "Run System File Checker: open Command Prompt (Admin) and run: sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
    ],
  },
  {
    slug: "0x80070005",
    title: "Fix 0x80070005",
    description: "Access denied error caused by permission issues.",
    whatItMeans:
      "This error usually indicates Windows Update (or an installer) was blocked by permissions, security software, or restricted system folders.",
    tryFirst: [
      "Restart your PC and try again.",
      "Temporarily disable third-party antivirus (if installed) and retry.",
      "Run the update/installer as Administrator (right-click → Run as administrator).",
    ],
    advanced: [
      "Run Windows Update Troubleshooter (Settings → System → Troubleshoot).",
      "Run System File Checker: sfc /scannow (Command Prompt as Admin).",
      "Reset Windows Update components (we can add the full script next).",
    ],
  },
  {
    slug: "0x80072ee7",
    title: "Fix 0x80072ee7",
    description: "Network connectivity or DNS-related Windows Update error.",
    whatItMeans:
      "Windows can’t reach Microsoft update servers. This is commonly caused by DNS issues, proxy/VPN settings, or a broken network connection.",
    tryFirst: [
      "Check that other websites load normally (confirm internet works).",
      "Restart your router/modem and your PC.",
      "Disable VPN/Proxy temporarily and retry Windows Update.",
    ],
    advanced: [
      "Flush DNS: open Command Prompt and run: ipconfig /flushdns",
      "Reset networking: netsh winsock reset (then restart PC).",
      "Try switching DNS to a public DNS provider (we can add steps).",
    ],
  },
  {
    slug: "0x80070424",
    title: "Fix 0x80070424",
    description: "Windows Update service missing or corrupted.",
    whatItMeans:
      "This can happen when Windows Update components are damaged, missing, or blocked by system configuration or corruption.",
    tryFirst: [
      "Restart your PC and retry Windows Update.",
      "Run Windows Update Troubleshooter (Settings → System → Troubleshoot).",
      "Check Services to confirm Windows Update is present and not disabled.",
    ],
    advanced: [
      "Run: sfc /scannow (Command Prompt as Admin).",
      "Run: DISM /Online /Cleanup-Image /RestoreHealth",
      "Reset Windows Update components (we can add the full script next).",
    ],
  },
  {
    slug: "0x80070570",
    title: "Fix 0x80070570",
    description: "Corrupted installation files or disk errors.",
    whatItMeans:
      "This often appears when a file needed for an update or install is corrupted or your drive has read/write errors.",
    tryFirst: [
      "Restart your PC and retry the update/install.",
      "Free up disk space (aim for 10+ GB free).",
      "Try downloading the update again (corruption can occur in transit).",
    ],
    advanced: [
      "Run disk check: chkdsk /scan (Command Prompt as Admin).",
      "Run: sfc /scannow",
      "Try installing the update manually from Microsoft Update Catalog (optional).",
    ],
  },
  {
    slug: "0x80070057",
    title: "Fix 0x80070057",
    description: "Invalid parameter or misconfigured Windows Update components.",
    whatItMeans:
      "This can be caused by invalid update settings, corrupted update cache, or system misconfiguration.",
    tryFirst: [
      "Restart your PC and retry.",
      "Run Windows Update Troubleshooter.",
      "Check date/time settings are correct (incorrect time can break updates).",
    ],
    advanced: [
      "Run: sfc /scannow",
      "Run: DISM /Online /Cleanup-Image /RestoreHealth",
      "Reset Windows Update components (we can add the full script next).",
    ],
  },
  {
    slug: "0x80072f8f",
    title: "Fix 0x80072f8f",
    description: "SSL or TLS connection issue during Windows Update.",
    whatItMeans:
      "Windows couldn’t establish a secure connection. This is often caused by incorrect system time, TLS settings, or security software interference.",
    tryFirst: [
      "Confirm your PC date/time is correct and set to auto.",
      "Temporarily disable VPN/Proxy and retry.",
      "Restart PC and try again.",
    ],
    advanced: [
      "Run Windows Update Troubleshooter.",
      "Reset networking: netsh winsock reset (then restart).",
      "Check TLS settings in Internet Options (we can add exact steps).",
    ],
  },
  {
    slug: "0x80070020",
    title: "Fix 0x80070020",
    description: "Another process is locking Windows Update files.",
    whatItMeans:
      "Another program (often antivirus, backup tools, or installers) is using a file Windows Update needs.",
    tryFirst: [
      "Restart your PC and try Windows Update again.",
      "Close background installers and pause antivirus scans temporarily.",
      "Try updating after a clean boot (we can add steps).",
    ],
    advanced: [
      "Run Windows Update Troubleshooter.",
      "Run: sfc /scannow",
      "Reset Windows Update components (we can add the full script next).",
    ],
  },
];

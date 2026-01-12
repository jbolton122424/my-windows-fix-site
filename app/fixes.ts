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
      "Run the Windows Update Troubleshooter (Settings -> System -> Troubleshoot).",
      "Run System File Checker: open Command Prompt (Admin) and run: sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
    ],
    scriptSection: {
      title: "Reset Windows Update Components",
      intro:
        "If enabling the service didn't work, Windows Update components may be stuck or corrupted. This reset is safe and commonly fixes 0x80070422.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `net stop wuauserv
net stop bits
net stop cryptsvc
net stop msiserver

ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old
ren C:\\Windows\\System32\\catroot2 catroot2.old

net start wuauserv
net start bits
net start cryptsvc
net start msiserver`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If system files or update components are damaged, manual steps may not fully resolve 0x80070422.",
        "In that case, an automated Windows repair tool can scan for common causes like broken update services and corrupted system files.",
      ],
      ctaText: "Fix Windows Update errors automatically with this repair tool",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note:
        "(This link is a placeholder for now. We'll replace it with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070422?",
        a: "Most commonly it's caused by the Windows Update service being disabled. It can also be caused by corrupted update components or system files.",
      },
      {
        q: "Is error 0x80070422 dangerous?",
        a: "The error itself isn't dangerous, but it can prevent security updates from installing.",
      },
      {
        q: "Can this error fix itself?",
        a: "Sometimes a restart or re-enabling services fixes it. If it keeps returning, use the steps above.",
      },
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
      "Run the update/installer as Administrator (right-click -> Run as administrator).",
    ],
    advanced: [
      "Run Windows Update Troubleshooter (Settings -> System -> Troubleshoot).",
      "Run System File Checker: sfc /scannow (Command Prompt as Admin).",
      "Reset Windows Update components (we can add the full script next).",
    ],
  },
  {
    slug: "0x80072ee7",
    title: "Fix 0x80072ee7",
    description: "Network connectivity or DNS-related Windows Update error.",
    whatItMeans:
      "Windows can't reach Microsoft update servers. This is commonly caused by DNS issues, proxy/VPN settings, or a broken network connection.",
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
      "Run Windows Update Troubleshooter (Settings -> System -> Troubleshoot).",
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
      "Windows couldn't establish a secure connection. This is often caused by incorrect system time, TLS settings, or security software interference.",
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

  // UPDATED: 0x80070643 includes script + affiliate callout + FAQ
  {
    slug: "0x80070643",
    title: "Fix 0x80070643",
    description: "Install failed (MSI error) during Windows Update or app install.",
    whatItMeans:
      "This error often appears when a Windows Update or installer fails due to corrupted update components, .NET/Windows Installer issues, or system file corruption.",
    tryFirst: [
      "Restart your PC and try the update/installation again.",
      "Temporarily disable third-party antivirus (if installed) and try again.",
      "If it's a specific app installer, right-click it and choose Run as administrator.",
    ],
    advanced: [
      "Run Windows Update Troubleshooter (Settings -> System -> Troubleshoot).",
      "Repair system files: open Command Prompt (Admin) and run: sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
    ],
    scriptSection: {
      title: "Reset Windows Update Components (Common Fix for 0x80070643)",
      intro:
        "If 0x80070643 keeps returning, Windows Update components or the installer pipeline may be stuck. This reset is safe and often fixes installer-related failures.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `net stop wuauserv
net stop bits
net stop cryptsvc
net stop msiserver

ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old
ren C:\\Windows\\System32\\catroot2 catroot2.old

net start wuauserv
net start bits
net start cryptsvc
net start msiserver`,
      outro:
        "Restart your PC, then run Windows Update (or the installer) again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If system files, update components, or installer dependencies are damaged, manual steps may not fully resolve 0x80070643.",
        "An automated Windows repair tool can scan for common causes like corrupted system files and broken update components.",
      ],
      ctaText: "Fix Windows install/update errors automatically with this repair tool",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note:
        "(This link is a placeholder for now. We'll replace it with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070643?",
        a: "It's commonly an installer failure during Windows Update or an MSI-based install. Causes include corrupted update components, .NET/Windows Installer issues, security software interference, or system file corruption.",
      },
      {
        q: "Is 0x80070643 a Windows Update error or an installer error?",
        a: "Both. It often appears in Windows Update history, but it is frequently tied to MSI installer failures (including .NET or security definition updates).",
      },
      {
        q: "What should I try first for 0x80070643?",
        a: "Restart, temporarily disable third-party antivirus, then run the update/installer as Administrator. If it keeps failing, run SFC/DISM and reset Windows Update components.",
      },
    ],
  },

  // NEW: 0x800f081f (polished)
  {
    slug: "0x800f081f",
    title: "Fix 0x800f081f",
    description: "The source files could not be found (DISM/.NET repair failure).",
    whatItMeans:
      "Error 0x800f081f commonly happens when Windows cannot find the files needed to repair or install Windows features (often .NET Framework 3.5) or when DISM cannot access a valid repair source.",
    tryFirst: [
      "Restart your PC and try the action again.",
      "Disconnect VPN/Proxy (if enabled) and try again.",
      "Run Windows Update and install all pending updates, then retry.",
    ],
    advanced: [
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
      "Run DISM repair (Command Prompt as Admin): DISM /Online /Cleanup-Image /RestoreHealth",
      "If installing .NET Framework 3.5, try enabling it via Windows Features (we can add exact steps).",
    ],
    scriptSection: {
      title: "Repair Windows Image with DISM (Common Fix for 0x800f081f)",
      intro:
        "If 0x800f081f appears during DISM or feature installation, repairing the component store usually fixes it. Run these commands in Command Prompt (Admin).",
      stepsIntro: "Run these commands one at a time:",
      code: `DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro:
        "Restart your PC and try the feature install or update again. If DISM still reports missing source files, you may need to provide a Windows ISO as the repair source.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If the Windows component store is heavily corrupted, DISM may continue failing with 0x800f081f even after basic repairs.",
        "An automated Windows repair tool can scan for common corruption issues and fix many problems without manual command-line steps.",
      ],
      ctaText: "Repair Windows system files automatically with this tool",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note:
        "(This link is a placeholder for now. We'll replace it with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x800f081f?",
        a: "Usually Windows cannot locate the repair source files required for DISM or optional feature installs. It can also be caused by a corrupted component store or missing/corrupted system files.",
      },
      {
        q: "Does 0x800f081f relate to .NET Framework 3.5?",
        a: "Often yes. Many people see 0x800f081f when enabling .NET Framework 3.5 because Windows can't download or locate the required files.",
      },
      {
        q: "What is the best first command to try?",
        a: "Start with DISM /Online /Cleanup-Image /RestoreHealth, then run sfc /scannow. If DISM still cannot find source files, you may need to specify a repair source (like a mounted Windows ISO).",
      },
    ],
  },
];

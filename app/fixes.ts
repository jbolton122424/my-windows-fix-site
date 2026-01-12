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
        "If enabling the service did not work, Windows Update components may be stuck or corrupted.",
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
        "If update services or system files are damaged, manual steps may not fully resolve this error.",
        "An automated Windows repair tool can scan for common issues and repair them automatically.",
      ],
      ctaText: "Fix Windows Update errors automatically with this repair tool",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070422?",
        a: "It usually occurs when the Windows Update service is disabled or blocked.",
      },
      {
        q: "Is error 0x80070422 dangerous?",
        a: "The error itself is not dangerous, but it can prevent security updates from installing.",
      },
      {
        q: "Can this error fix itself?",
        a: "Sometimes restarting or re-enabling services resolves it.",
      },
    ],
  },

  {
    slug: "0x80070643",
    title: "Fix 0x80070643",
    description: "Install failed (MSI error) during Windows Update or app install.",
    whatItMeans:
      "This error often appears when an installer or Windows Update fails due to corrupted update components, .NET issues, or system file corruption.",
    tryFirst: [
      "Restart your PC and try the update or installation again.",
      "Temporarily disable third-party antivirus and retry.",
      "Run the installer or Windows Update as Administrator.",
    ],
    advanced: [
      "Run Windows Update Troubleshooter.",
      "Run System File Checker: sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
    ],
    scriptSection: {
      title: "Reset Windows Update Components",
      intro:
        "Resetting update components often fixes installer-related failures like 0x80070643.",
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
      outro: "Restart your PC and retry the update or installer.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If system files or installer components are damaged, manual steps may not be enough.",
        "An automated repair tool can detect and fix common Windows issues.",
      ],
      ctaText: "Repair Windows install errors automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070643?",
        a: "It is commonly caused by MSI installer failures, .NET issues, or corrupted system files.",
      },
      {
        q: "Is 0x80070643 related to Windows Update?",
        a: "Yes, it frequently appears during Windows Update but can also occur with app installs.",
      },
    ],
  },

  // NEW: 0x80073712 (component store corruption)
  {
    slug: "0x80073712",
    title: "Fix 0x80073712",
    description: "Windows Update failed due to component store corruption.",
    whatItMeans:
      "Error 0x80073712 usually means the Windows component store (WinSxS) is corrupted. This prevents Windows Update from installing updates correctly.",
    tryFirst: [
      "Restart your PC and try Windows Update again.",
      "Disconnect VPN or proxy connections and retry.",
      "Make sure your system has enough free disk space (10 GB or more).",
    ],
    advanced: [
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
      "Retry Windows Update after repairs complete.",
    ],
    scriptSection: {
      title: "Repair Windows Component Store (Recommended)",
      intro:
        "Because this error indicates component store corruption, repairing the Windows image is the most effective fix.",
      stepsIntro: "Run these commands in Command Prompt (Admin):",
      code: `DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro:
        "Restart your PC after the commands complete, then run Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "Severe component store corruption may prevent Windows Update from repairing itself.",
        "An automated Windows repair tool can scan and fix deep system corruption automatically.",
      ],
      ctaText: "Fix Windows Update corruption automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80073712?",
        a: "It is caused by corruption in the Windows component store (WinSxS).",
      },
      {
        q: "Is 0x80073712 serious?",
        a: "It can prevent updates from installing, but it is usually fixable with DISM and SFC.",
      },
      {
        q: "Should I reset Windows for this error?",
        a: "Usually no. Try DISM and SFC first before considering a reset.",
      },
    ],
  },
];

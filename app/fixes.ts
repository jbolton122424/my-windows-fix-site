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
        "If enabling the service did not work, Windows Update components may be stuck or corrupted. This reset is safe and commonly fixes 0x80070422.",
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
        a: "It usually occurs when the Windows Update service is disabled, blocked, or not running.",
      },
      {
        q: "Is error 0x80070422 dangerous?",
        a: "The error itself is not dangerous, but it can prevent security updates from installing.",
      },
      {
        q: "What should I try first?",
        a: "Restart, re-enable Windows Update in Services, and then run Windows Update again.",
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
      "Run DISM repair (Command Prompt as Admin): DISM /Online /Cleanup-Image /RestoreHealth",
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
    ],
    scriptSection: {
      title: "Reset Update Components (Common Fix for 0x80070005)",
      intro:
        "If 0x80070005 appears during Windows Update, resetting update components and repairing system files often clears permission-related blocks.",
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
net start msiserver

DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro: "Restart your PC and try the update or installer again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If permissions or system files are damaged, manual steps may not fully resolve 0x80070005.",
        "An automated repair tool can scan for common Windows issues and fix them automatically.",
      ],
      ctaText: "Fix access denied and Windows Update errors automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070005?",
        a: "It is usually caused by permission blocks, security software interference, or restricted system folders during an update or install.",
      },
      {
        q: "Is 0x80070005 only a Windows Update error?",
        a: "No. It can also happen during app installs, Microsoft Store installs, or system changes that require elevated permissions.",
      },
      {
        q: "What should I try first?",
        a: "Restart, temporarily disable third-party antivirus, then run the update or installer as Administrator.",
      },
    ],
  },

  {
    slug: "0x80072ee7",
    title: "Fix 0x80072ee7",
    description: "Network connectivity or DNS-related Windows Update error.",
    whatItMeans:
      "Windows cannot reach Microsoft update servers. This is commonly caused by DNS issues, proxy/VPN settings, or a broken network connection.",
    tryFirst: [
      "Confirm the internet works by loading a few websites.",
      "Restart your router/modem and your PC.",
      "Disable VPN or Proxy temporarily and retry Windows Update.",
    ],
    advanced: [
      "Flush DNS (Command Prompt): ipconfig /flushdns",
      "Reset Winsock (Command Prompt): netsh winsock reset (then restart PC).",
      "Switch DNS to a public provider (Google DNS or Cloudflare) and retry.",
    ],
    scriptSection: {
      title: "Reset DNS and Network Stack (Common Fix)",
      intro:
        "If Windows Update cannot resolve Microsoft servers, resetting DNS and the network stack often fixes 0x80072ee7.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `ipconfig /flushdns
ipconfig /release
ipconfig /renew
netsh winsock reset
netsh int ip reset`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If network settings are deeply misconfigured or system files are damaged, basic resets may not be enough.",
        "An automated Windows repair tool can scan for common configuration issues and repair them automatically.",
      ],
      ctaText: "Fix Windows network and update errors automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80072ee7?",
        a: "Most often DNS issues, VPN/proxy settings, or connectivity problems prevent Windows from reaching update servers.",
      },
      {
        q: "Can antivirus or VPN cause 0x80072ee7?",
        a: "Yes. VPNs, proxies, and some security tools can block or redirect update traffic.",
      },
      {
        q: "What should I try first?",
        a: "Disable VPN/proxy, restart networking equipment, and flush DNS.",
      },
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
      "Check Services to confirm Windows Update exists and is not disabled.",
    ],
    advanced: [
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
      "Run DISM repair (Command Prompt as Admin): DISM /Online /Cleanup-Image /RestoreHealth",
      "Reset Windows Update components and retry.",
    ],
    scriptSection: {
      title: "Rebuild Windows Update Components",
      intro:
        "If Windows Update services are missing or corrupted, rebuilding the update components often restores normal update behavior.",
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
net start msiserver

DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If update services are missing due to deeper corruption, manual resets may not fully restore them.",
        "An automated repair tool can scan for common Windows component problems and repair them automatically.",
      ],
      ctaText: "Fix Windows Update component issues automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070424?",
        a: "Windows Update services or components may be missing, disabled, or corrupted.",
      },
      {
        q: "Is 0x80070424 related to services.msc?",
        a: "Often yes. The Windows Update service may be missing or not starting correctly.",
      },
      {
        q: "What should I try first?",
        a: "Run the Windows Update troubleshooter and verify the Windows Update service exists and is enabled.",
      },
    ],
  },

  {
    slug: "0x80070570",
    title: "Fix 0x80070570",
    description: "Corrupted installation files or disk errors.",
    whatItMeans:
      "This often appears when a file needed for an update or install is corrupted or your drive has read/write errors.",
    tryFirst: [
      "Restart your PC and retry the update or install.",
      "Free up disk space (aim for 10 GB or more).",
      "Try downloading the update or installer again.",
    ],
    advanced: [
      "Run disk check (Command Prompt as Admin): chkdsk /scan",
      "Run System File Checker: sfc /scannow",
      "Try installing the update manually (optional).",
    ],
    scriptSection: {
      title: "Check Disk and Repair System Files",
      intro:
        "If corrupted files or disk issues are causing 0x80070570, checking the disk and repairing system files is the best next step.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `chkdsk /scan
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro:
        "Restart your PC and retry the update or installation. If you still see corruption errors, consider checking drive health.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If disk errors or file corruption are severe, manual repairs may not fully resolve the issue.",
        "An automated repair tool can scan for system corruption and repair common Windows problems automatically.",
      ],
      ctaText: "Fix Windows file corruption automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070570?",
        a: "Most commonly corrupted installation files, bad sectors, or file system problems on the drive.",
      },
      {
        q: "Could a failing hard drive cause this error?",
        a: "Yes. If your drive is failing, updates and installs may fail with corruption errors.",
      },
      {
        q: "What should I try first?",
        a: "Free disk space, retry the download, then run CHKDSK and SFC.",
      },
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
      "Check date/time settings are correct.",
    ],
    advanced: [
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
      "Run DISM repair (Command Prompt as Admin): DISM /Online /Cleanup-Image /RestoreHealth",
      "Reset Windows Update components and retry.",
    ],
    scriptSection: {
      title: "Reset Update Cache and Repair System Files",
      intro:
        "If 0x80070057 is caused by a bad update cache or misconfiguration, resetting the update cache and repairing system files often fixes it.",
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
net start msiserver

DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If Windows Update settings or system components are heavily corrupted, manual resets may not fully resolve 0x80070057.",
        "An automated repair tool can scan and fix many common Windows issues automatically.",
      ],
      ctaText: "Fix Windows Update configuration issues automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070057?",
        a: "It often comes from invalid update parameters, corrupted update cache, or misconfigured Windows Update settings.",
      },
      {
        q: "Can wrong system time cause this error?",
        a: "It can contribute to update failures. Always confirm date and time are correct before deeper fixes.",
      },
      {
        q: "What should I try first?",
        a: "Restart, run the troubleshooter, and confirm date/time settings. Then reset update components if needed.",
      },
    ],
  },

  {
    slug: "0x80072f8f",
    title: "Fix 0x80072f8f",
    description: "SSL or TLS connection issue during Windows Update.",
    whatItMeans:
      "Windows could not establish a secure connection. This is often caused by incorrect system time, TLS settings, proxy/VPN use, or security software interference.",
    tryFirst: [
      "Confirm your PC date/time is correct and set to automatic.",
      "Disable VPN/Proxy temporarily and retry.",
      "Restart PC and try again.",
    ],
    advanced: [
      "Reset networking (Command Prompt): netsh winsock reset (then restart).",
      "Run System File Checker: sfc /scannow",
      "Run DISM repair: DISM /Online /Cleanup-Image /RestoreHealth",
    ],
    scriptSection: {
      title: "Reset Network Stack and Repair System Files",
      intro:
        "If secure connections fail during updates, resetting the network stack and repairing system files often resolves 0x80072f8f.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `netsh winsock reset
netsh int ip reset
ipconfig /flushdns
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If TLS settings or system components are corrupted, manual steps may not fully resolve secure connection errors.",
        "An automated repair tool can scan for Windows configuration issues and repair common problems automatically.",
      ],
      ctaText: "Fix Windows secure connection errors automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80072f8f?",
        a: "It usually happens when Windows cannot establish a secure connection due to bad system time, TLS settings, proxy/VPN, or security software.",
      },
      {
        q: "Does incorrect date/time really matter?",
        a: "Yes. Incorrect system time can cause certificate validation to fail, which breaks secure connections.",
      },
      {
        q: "What should I try first?",
        a: "Fix date/time, disable VPN/proxy, then retry Windows Update.",
      },
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
      "Try updating after a clean boot (optional).",
    ],
    advanced: [
      "Run Windows Update Troubleshooter.",
      "Repair system files: sfc /scannow",
      "Reset Windows Update components and retry.",
    ],
    scriptSection: {
      title: "Reset Update Components (Unlock Common File Locks)",
      intro:
        "If another process is locking update files, restarting services and resetting the update cache often clears 0x80070020.",
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
net start msiserver

sfc /scannow`,
      outro: "Restart your PC and try Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If background software keeps locking Windows Update files, manual steps may not fully resolve repeated failures.",
        "An automated repair tool can scan for Windows issues and help stabilize updates.",
      ],
      ctaText: "Fix Windows Update issues automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note: "(Replace with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80070020?",
        a: "It is usually caused by another program locking files Windows Update needs (antivirus, backup tools, installers).",
      },
      {
        q: "Is a clean boot helpful?",
        a: "Yes. A clean boot can stop background services that interfere with updates.",
      },
      {
        q: "What should I try first?",
        a: "Restart, pause antivirus scans, close installers, then retry.",
      },
    ],
  },

  {
    slug: "0x80070643",
    title: "Fix 0x80070643",
    description: "Install failed (MSI error) during Windows Update or app install.",
    whatItMeans:
      "This error often appears when a Windows Update or installer fails due to corrupted update components, .NET/Windows Installer issues, or system file corruption.",
    tryFirst: [
      "Restart your PC and try the update/installation again.",
      "Temporarily disable third-party antivirus (if installed) and try again.",
      "If it is a specific app installer, right-click it and choose Run as administrator.",
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
      outro: "Restart your PC, then run Windows Update (or the installer) again.",
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
        a: "It is commonly an installer failure during Windows Update or an MSI-based install. Causes include corrupted update components, .NET/Windows Installer issues, security software interference, or system file corruption.",
      },
      {
        q: "Is 0x80070643 a Windows Update error or an installer error?",
        a: "Both. It often appears in Windows Update history, but it is frequently tied to MSI installer failures.",
      },
      {
        q: "What should I try first for 0x80070643?",
        a: "Restart, temporarily disable third-party antivirus, then run the update/installer as Administrator.",
      },
    ],
  },

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
      "If installing .NET Framework 3.5, try enabling it via Windows Features.",
    ],
    scriptSection: {
      title: "Repair Windows Image with DISM (Common Fix for 0x800f081f)",
      intro:
        "If 0x800f081f appears during DISM or feature installation, repairing the component store usually fixes it.",
      stepsIntro: "Run these commands one at a time (Command Prompt as Admin):",
      code: `DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow`,
      outro:
        "Restart your PC and try again. If DISM still reports missing source files, you may need a Windows ISO as the repair source.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "If the Windows component store is heavily corrupted, DISM may continue failing with 0x800f081f even after basic repairs.",
        "An automated repair tool can scan for common corruption issues and fix many problems without manual command-line steps.",
      ],
      ctaText: "Repair Windows system files automatically with this tool",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note:
        "(This link is a placeholder for now. We'll replace it with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x800f081f?",
        a: "Windows cannot locate the repair source files required for DISM or optional feature installs, or the component store is corrupted.",
      },
      {
        q: "Does 0x800f081f relate to .NET Framework 3.5?",
        a: "Often yes. Many users see it when enabling .NET Framework 3.5 because Windows cannot download or locate the required files.",
      },
      {
        q: "What should I try first?",
        a: "Run DISM /Online /Cleanup-Image /RestoreHealth, then run sfc /scannow.",
      },
    ],
  },

  {
    slug: "0x80073712",
    title: "Fix 0x80073712",
    description: "Windows Update failed due to component store corruption.",
    whatItMeans:
      "Error 0x80073712 usually means the Windows component store (WinSxS) is corrupted. This prevents Windows Update from installing updates correctly.",
    tryFirst: [
      "Restart your PC and try Windows Update again.",
      "Disconnect VPN/Proxy temporarily (if enabled) and retry.",
      "Make sure you have enough free disk space (aim for 10 GB or more).",
    ],
    advanced: [
      "Run System File Checker (Command Prompt as Admin): sfc /scannow",
      "Run DISM repair (Command Prompt as Admin): DISM /Online /Cleanup-Image /RestoreHealth",
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
      outro: "Restart your PC after the commands complete, then run Windows Update again.",
    },
    affiliateCallout: {
      title: "If the Error Still Persists",
      body: [
        "Severe component store corruption may prevent Windows Update from repairing itself.",
        "An automated Windows repair tool can scan and fix deep system corruption automatically.",
      ],
      ctaText: "Fix Windows Update corruption automatically",
      href: "YOUR_AFFILIATE_LINK_HERE",
      note:
        "(This link is a placeholder for now. We'll replace it with your real affiliate link later.)",
    },
    faq: [
      {
        q: "What causes error 0x80073712?",
        a: "It is commonly caused by corruption in the Windows component store (WinSxS).",
      },
      {
        q: "Is 0x80073712 serious?",
        a: "It can prevent updates from installing, but it is usually fixable with DISM and SFC.",
      },
      {
        q: "What should I try first?",
        a: "Run DISM and SFC to repair the component store, then try Windows Update again.",
      },
    ],
  },
];

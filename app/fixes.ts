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
href: "https://outebytech.com/W5mgq4g8?subid=0x80070422",
note:
"Disclosure: We may earn a commission if you purchase through this link (at no extra cost to you).",
},
},

{
slug: "0x80070005",
title: "Fix 0x80070005",
description: "Access denied error caused by permission issues.",
whatItMeans:
"This error usually indicates Windows Update (or an installer) was blocked by permissions or security software.",
tryFirst: [
"Restart your PC and try again.",
"Temporarily disable third-party antivirus.",
"Run the update or installer as Administrator.",
],
advanced: [
"Run Windows Update Troubleshooter.",
"Run DISM repair.",
"Run System File Checker.",
],
affiliateCallout: {
title: "If the Error Still Persists",
body: [
"If permissions or system files are damaged, manual steps may not fully resolve 0x80070005.",
"An automated repair tool can scan for common Windows issues and fix them automatically.",
],
ctaText: "Fix access denied and Windows Update errors automatically",
href: "https://outebytech.com/W5mgq4g8?subid=0x80070005",
note:
"Disclosure: We may earn a commission if you purchase through this link.",
},
},

{
slug: "0x80072ee7",
title: "Fix 0x80072ee7",
description: "Network connectivity or DNS-related Windows Update error.",
whatItMeans:
"Windows cannot reach Microsoft update servers due to DNS or network issues.",
tryFirst: [
"Confirm internet works.",
"Restart router and PC.",
"Disable VPN or Proxy.",
],
advanced: [
"Flush DNS.",
"Reset Winsock.",
"Switch DNS provider.",
],
affiliateCallout: {
title: "If the Error Still Persists",
body: [
"If network settings are deeply misconfigured, basic resets may not be enough.",
"An automated repair tool can scan for configuration issues and repair them automatically.",
],
ctaText: "Fix Windows network and update errors automatically",
href: "https://outebytech.com/W5mgq4g8?subid=0x80072ee7",
note:
"Disclosure: We may earn a commission if you purchase through this link.",
},
},

{
slug: "0x8024401c",
title: "Fix 0x8024401c",
description: "Windows Update cannot connect to update services.",
whatItMeans:
"This error appears when Windows Update cannot communicate with Microsoft servers.",
tryFirst: [
"Restart PC.",
"Disable VPN/Proxy.",
"Restart router.",
],
advanced: [
"Flush DNS.",
"Reset network stack.",
"Reset Windows Update components.",
],
affiliateCallout: {
title: "If the Error Still Persists",
body: [
"If Windows Update networking or system components are damaged, manual resets may not fully resolve repeated connection failures.",
"An automated repair tool can scan for common Windows issues and repair them automatically.",
],
ctaText: "Fix Windows Update connection errors automatically",
href: "https://outebytech.com/W5mgq4g8?subid=0x8024401c",
note:
"Disclosure: We may earn a commission if you purchase through this link.",
},
},

{
slug: "0x80070424",
title: "Fix 0x80070424",
description: "Windows Update service missing or corrupted.",
whatItMeans:
"Windows Update components may be missing or damaged.",
tryFirst: [
"Restart PC.",
"Run Windows Update Troubleshooter.",
"Check Windows Update service.",
],
advanced: [
"Run System File Checker.",
"Run DISM repair.",
"Reset Windows Update components.",
],
affiliateCallout: {
title: "If the Error Still Persists",
body: [
"If update services are missing due to deeper corruption, manual resets may not fully restore them.",
"An automated repair tool can scan for Windows component problems.",
],
ctaText: "Fix Windows Update component issues automatically",
href: "https://outebytech.com/W5mgq4g8?subid=0x80070424",
note:
"Disclosure: We may earn a commission if you purchase through this link.",
},
},

{
slug: "0x80070570",
title: "Fix 0x80070570",
description: "Corrupted installation files or disk errors.",
whatItMeans:
"This error often occurs when files are corrupted or disk errors exist.",
tryFirst: [
"Restart PC.",
"Free disk space.",
"Download installer again.",
],
advanced: [
"Run CHKDSK.",
"Run System File Checker.",
],
affiliateCallout: {
title: "If the Error Still Persists",
body: [
"If disk errors or file corruption are severe, manual repairs may not resolve the issue.",
"An automated repair tool can scan and repair Windows problems.",
],
ctaText: "Fix Windows file corruption automatically",
href: "https://outebytech.com/W5mgq4g8?subid=0x80070570",
note:
"Disclosure: We may earn a commission if you purchase through this link.",
},
},

];
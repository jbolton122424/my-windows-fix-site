import { fixes } from "@/app/fixes";

const SITE_URL = "https://fixerrorhelp.com";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  const staticPages = [
    "",
    "/windows-update-errors",
    "/activation-errors",
    "/network-errors",
    "/microsoft-store-errors",
    "/install-and-corruption-errors",
  ];

  const urls = [
    ...staticPages.map((path) => `${SITE_URL}${path}`),
    ...fixes.map((fix) => `${SITE_URL}/fix/${fix.slug}`),
  ];

  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
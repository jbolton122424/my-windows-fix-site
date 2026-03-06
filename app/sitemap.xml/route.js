import { fixes } from "@/app/fixes";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  const baseUrl = "https://fixerrorhelp.com".replace(/\/$/, "");
  const lastmod = new Date().toISOString();

  const staticPages = [
    {
      path: "",
      changefreq: "weekly",
      priority: "1.0",
    },
  ];

  const staticUrls = staticPages.map(
    (page) => `
  <url>
    <loc>${escapeXml(`${baseUrl}/${page.path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  );

  const fixUrls = fixes.map(
    (fix) => `
  <url>
    <loc>${escapeXml(`${baseUrl}/fix/${fix.slug}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[
    ...staticUrls,
    ...fixUrls,
  ].join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
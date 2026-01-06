export async function GET() {
Sitemap: https://my-windows-fix-site-1.vercel.app/sitemap.xml

  const pages = [
    "",
    "/fix/0x80070422",
    "/fix/0x80070005",
    "/fix/0x80072ee7",
    "/fix/0x80070424",
    "/fix/0x80070570",
    "/fix/0x80070057",
    "/fix/0x80072f8f",
    "/fix/0x80070020"
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}

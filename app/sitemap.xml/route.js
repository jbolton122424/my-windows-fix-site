// app/sitemap.xml/route.js
export async function GET() {
  const baseUrl = "https://fixerrorhelp.com";

  const routes = [
    "/",
    "/fix/0x80070422",
    "/fix/0x80070005",
    "/fix/0x80072ee7",
    "/fix/0x8024401c",
    "/fix/0x80070424",
    "/fix/0x80070570",
    "/fix/0x80070057",
    "/fix/0x80072f8f",
    "/fix/0x80070020",
    "/fix/0x80070643",
    "/fix/0x800f081f",
    "/fix/0x80070002",
    "/fix/0x80073712",
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
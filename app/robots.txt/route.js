// app/robots.txt/route.js
export const dynamic = "force-dynamic";

export async function GET() {
  const content = `User-agent: *
Disallow:

Sitemap: https://fixerrorhelp.com/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

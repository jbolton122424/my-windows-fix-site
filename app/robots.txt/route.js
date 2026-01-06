// app/robots.txt/route.js
export async function GET() {
  const content = `User-agent: *
Disallow:

Sitemap: https://my-windows-fix-site-1.vercel.app/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

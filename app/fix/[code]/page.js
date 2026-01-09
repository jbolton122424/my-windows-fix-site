// app/fix/[code]/page.js
import { fixes } from "@/app/fixes";

// No Navbar import here!

export default async function FixPage({ params }) {
  const { code: slug } = await params;

  const fix = fixes.find((f) => f.slug === slug);

  if (!fix) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Page not found</h1>
        <p>No guide found for {slug}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>{fix.title}</h1>
      <p>{fix.description}</p>
    </main>
  );
}

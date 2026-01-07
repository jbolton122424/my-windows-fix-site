// app/fix/[code]/page.js
import { fixes } from "../../fixes"; // import the fixes array

export default function FixPage({ params }) {
  const slug = params.code; // Next.js uses [code] as the param name
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

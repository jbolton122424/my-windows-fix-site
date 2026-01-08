import { fixes } from "../../fixes";

export default function FixPage({ params }) {
  const code = params.code;

  const fix = fixes.find((f) => f.slug === code);

  if (!fix) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Page not found</h1>
        <p>No guide found for {code}</p>
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


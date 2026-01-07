import { fixes } from "../../fixes"; // Correct relative path
import Navbar from "../../components/Navbar";


export default function FixPage({ params }) {
  const code = params.code; // gets the code from the URL
  const fix = fixes.find((f) => f.code === code);

  if (!fix) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "40px", fontFamily: "Arial" }}>
          <h1>Page not found</h1>
          <p>No guide found for {code}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Fix {fix.code}</h1>
        <p>{fix.description}</p>
        <ol>
          {fix.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </main>
    </>
  );
}

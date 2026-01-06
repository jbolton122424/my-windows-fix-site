import Navbar from "../components/Navbar"; // Homepage is only one level inside app


export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Software Fix Guides</h1>
        <p>
          Simple step-by-step solutions for common software and system errors.
        </p>
      </main>
    </>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#eee", marginBottom: "20px" }}>
      <Link href="/" style={{ marginRight: "20px" }}>Home</Link>
      <Link href="/fix/0x80070422" style={{ marginRight: "20px" }}>Fix 0x80070422</Link>
      <Link href="/fix/0x80070005" style={{ marginRight: "20px"}}>Fix 0x80070005</Link>
      <Link href="/fix/0x80072ee7">Fix 0x80072ee7</Link>
    </nav>
  );
}

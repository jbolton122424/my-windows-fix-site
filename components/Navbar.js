// components/Navbar.js
import Link from "next/link";
import { fixes } from "../app/fixes"; // adjust path if needed

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#eee", marginBottom: "20px" }}>
      <Link href="/" style={{ marginRight: "20px" }}>
        Home
      </Link>

      {fixes.map((fix) => (
        <Link
          key={fix.slug}
          href={`/fix/${fix.slug}`}
          style={{ marginRight: "20px" }}
        >
          {fix.title}
        </Link>
      ))}
    </nav>
  );
}

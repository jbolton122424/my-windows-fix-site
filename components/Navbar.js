import Link from "next/link";
import { fixes } from "@/app/fixes";

export default function Nav() {
  return (
    <nav style={{ padding: 20, background: "#eee", marginBottom: 20 }}>
      <Link href="/" style={{ marginRight: 20 }}>
        Home
      </Link>

      {fixes.map((fix) => (
        <Link
          key={fix.slug}
          href={`/fix/${fix.slug}`}
          style={{ marginRight: 20 }}
        >
          {fix.code}
        </Link>
      ))}
    </nav>
  );
}

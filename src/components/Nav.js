import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/explore">Explore Dreams</Link>
        </li>
        <li className="nav-item">
          <Link href="/search">Find about your dream</Link>
        </li>
        <li className="nav-item">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
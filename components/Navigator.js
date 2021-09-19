import Link from "next/link";
import navStyle from "../styles/Navigate.module.css";
function Navigator() {
  return (
    <nav className={navStyle.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/myPage">myPage</Link>
        </li>
        <li>
          <Link href="/EditPage">EditPage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigator;

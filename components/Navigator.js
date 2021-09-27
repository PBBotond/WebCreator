import Link from "next/link";
import navStyle from "../styles/Navigate.module.css";
import Login_Signup from "./Login_Signup";
function Navigator() {
  return (
    <>
      <nav className={navStyle.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/Register">Register</Link>
          </li>
          <li>
            <Link href="/EditPage">EditPage</Link>
          </li>
          <li>
            <Login_Signup />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigator;

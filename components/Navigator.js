import Link from "next/link";
import navStyle from "../styles/Navigate.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
function Navigator() {
  const [session, loadingSession] = useSession();
  const logbut = loadingSession ? (
    <div className={navStyle.user}>
      <p>Loading...</p>
    </div>
  ) : session ? (
    <>
      <div className={navStyle.user}>
        <p>Hi {session.user.name}</p>
        <span />
        <img src={session.user.image} />
      </div>
      <a onClick={signOut}>SignOut</a>
    </>
  ) : (
    <Link href="/LogSig">Login/Sign</Link>
  );
  return (
    <>
      <nav className={navStyle.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/EditPage">EditPage</Link>
          </li>
          <li>{logbut}</li>
        </ul>
      </nav>
    </>
  );
}

export default Navigator;

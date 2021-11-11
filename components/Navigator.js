import Link from "next/link";
import navStyle from "../styles/Navigate.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import { useContext } from "react";
import AuthContext from "../DB/ContextStore";
import { InitData } from "../lib/initData";
import { wipeToken } from "../lib/wipeToken";

function SignOutHandler() {
  wipeToken();
  signOut();
}

export default function Navigator() {
  const activeUserCont = useContext(AuthContext);
  const [session, loadingSession] = useSession();
  console.log(activeUserCont.activeUser.name);
  const logbut = loadingSession ? (
    <div className={navStyle.user}>
      <p>Loading...</p>
    </div>
  ) : session ||
    (activeUserCont.activeUser.name !== "" &&
      activeUserCont.activeUser.name !== undefined) ? (
    <>
      <div className={navStyle.user}>
        <p>Hi {session ? session.user.name : activeUserCont.activeUser.name}</p>
        <span />
        <img
          src={session ? session.user.image : activeUserCont.activeUser.image}
        ></img>
      </div>
      <a onClick={SignOutHandler}>SignOut</a>
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

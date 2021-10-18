import styles from "../styles/Layout.module.css";
import Navigator from "./Navigator";
import { useContext, useEffect } from "react";
import AuthContext from "../DB/ContextStore";
import { InitData } from "../lib/initData";

export default function Layout({ children }) {
  const refreshClient = async () => {
    InitData().then((verified) => {
      console.log(verified);
      if (verified != "NoToken" && activeUserCont.activeUser.name === "") {
        console.log(verified);
        activeUserCont.SetactiveUser({
          name: verified.userName,
          email: verified.userMail,
          image: "/DefaultUser.jpg",
        });
      }
    });
  };
  const activeUserCont = useContext(AuthContext);
  useEffect(() => {
    refreshClient();
  });
  return (
    <>
      <Navigator />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}

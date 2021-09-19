import styles from "../styles/Layout.module.css";
import Navigator from "./Navigator";

const Layout = ({ children }) => {
  return (
    <>
      <Navigator />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;

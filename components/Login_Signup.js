import logSig from "../styles/Login.module.css";
import navStyle from "../styles/Navigate.module.css";
function Login_Signup() {
  return (
    <div className={(logSig.login)}>
      <input type="checkbox" id={logSig.show} className={logSig.inactive} />
      <div id={navStyle.loginLabel} className={logSig.logLabel}>
        <label for={logSig.show}>Login / Signup</label>
      </div>
      <div className={logSig.content}>
        <label for={logSig.show} className="close-btn">
          X
        </label>
        <form action="#">
          <label>Email</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
        </form>
      </div>
    </div>
  );
}

export default Login_Signup;

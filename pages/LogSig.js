import LoginForm from "../components/LoginForm";
import { signIn, signOut, useSession } from "next-auth/client";

function LogSig() {
  const [session, loadingSession] = useSession();

  if (session) {
    route.push("/");
  }
  return <>{!session && <LoginForm />}</>;
}

export default LogSig;

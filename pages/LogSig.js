import LoginForm from "../components/LoginForm";
import { signIn, signOut, useSession } from "next-auth/client";
import { Router, useRouter } from "next/router";

function LogSig() {
  const route = useRouter();
  const [session, loadingSession] = useSession();

  if (session) {
    route.push("/");
  }
  return <>{!session && <LoginForm />}</>;
}

export default LogSig;

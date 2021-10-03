import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
function LogSig() {
  const [session, loadingSession] = useSession();
  const route = useRouter();
  if (session) {
    route.push("/");
  }
  return <>{!session && <LoginForm />}</>;
}

export default LogSig;

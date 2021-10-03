import Head from "next/head";
import { useSession } from "next-auth/client";
export default function Home() {
  const [session, loading] = useSession();
  return (
    <div>
      <Head>
        <title>Web_Creator</title>
      </Head>
      <h1>Hello</h1>
      {session && (
        <>
          <h1>{session.user.name}</h1>
          <img src={session.user.image} />
        </>
      )}
      {!session && <h1>You are not signed in</h1>}
    </div>
  );
}

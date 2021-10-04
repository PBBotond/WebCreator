import "../styles/globals.css";
import Layout from "../components/Layout";
import Providers, { Provider } from "next-auth/client";
import { AuthContextProvider } from "../DB/ContextStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;

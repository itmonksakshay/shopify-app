import AppBridgeProvider from "@/components/providers/AppBridgeProvider";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import Link from "next/link";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <PolarisProvider i18n={translations}>
        <AppBridgeProvider>
          <ui-nav-menu>
            <Link rel="home" href="/">
              Home
            </Link>
            <Link href="/debug">Debug Cards</Link>
            <Link href="/widget">Widget</Link>
          </ui-nav-menu>
          <Component {...pageProps} />
        </AppBridgeProvider>
      </PolarisProvider>
    </>
  );
};

export default App;

import "@/styles/globals.css";
import { store } from "../store/store"
import Layout from "@/components/layouts/Layout";

import { Provider } from "react-redux";
import { AppProps } from 'next/app'; // Next.jsの型定義からAppPropsをインポート


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
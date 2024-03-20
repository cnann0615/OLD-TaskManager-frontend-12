import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store"
import { AppProps } from 'next/app'; // Next.jsの型定義からAppPropsをインポート

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
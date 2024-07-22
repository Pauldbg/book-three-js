import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Suspense } from "react";
import { LoadingWrapper } from "@/components/UI/Loading/LoadingWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <LoadingWrapper>
          <Component {...pageProps} />
        </LoadingWrapper>
    </Provider>
  );
}

export default MyApp;

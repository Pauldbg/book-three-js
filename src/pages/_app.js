import "@/styles/globals.css";
import { Provider } from "react-redux"; // Provider Redux
import { store } from "../redux/store"; // Store Redux
import { Suspense } from "react"; // Suspense pour les composants asynchrones
import { LoadingWrapper } from "@/components/UI/Loading/LoadingWrapper"; // Composant de chargement

function MyApp({ Component, pageProps }) { // Composant principal de l'application
  return (
    <Provider store={store}>
        <LoadingWrapper>
          <Component {...pageProps} /> 
        </LoadingWrapper>
    </Provider>
  );
}

export default MyApp;

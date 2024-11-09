import App from "./App.tsx";
import "./index.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/baloo-tamma-2";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import GlobalAlert from "./components/sonner-alert.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <React.Suspense>
              <GlobalAlert />
              <App />
            </React.Suspense>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

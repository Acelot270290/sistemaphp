import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "./routes";

import { persistor, store } from "./store";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ReduxProvider>
    </PersistGate>
  );
}

const appElement = document.getElementById("app");
if (appElement) {
  const root = createRoot(appElement);
  root.render(<App />);
}

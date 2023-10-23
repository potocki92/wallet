import React from "react";
import { Provider } from "react-redux/es";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./components/App";
import { persistor, store } from "./api/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

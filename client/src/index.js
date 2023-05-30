import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

// ---------------------
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/ReducerStore";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        {/* toutes les routes vont vers app */}
      </Routes>
    </BrowserRouter>
  </Provider>
);

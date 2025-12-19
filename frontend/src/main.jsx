import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>  {/* Helps detect bugs in development */}
    <BrowserRouter>  {/* Makes routing available to the entire app */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

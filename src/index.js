import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/userContext";

const contextWrap = (
  <UserProvider>
    <App />
  </UserProvider>
);

ReactDOM.render(
  <React.StrictMode>{contextWrap}</React.StrictMode>,
  document.getElementById("root")
);

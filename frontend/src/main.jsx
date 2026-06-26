import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <AuthProvider>
    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    success: {
      duration: 2500,
    },
    error: {
      duration: 4000,
    },
  }}
/>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./stores/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./index.css";


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

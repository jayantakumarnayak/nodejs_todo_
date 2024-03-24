import "./styles/app.scss";
import App from "./App.jsx";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createContext } from "react";

export const server = "https://nodejs-todoapp-r0jb.onrender.com/api/v1";

export const context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setloading,
        user,
        setUser,
      }}
    >
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

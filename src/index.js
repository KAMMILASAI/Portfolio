import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use ReactDOM.createRoot for React 18
import App from "./App";
import "./styles.css";  

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

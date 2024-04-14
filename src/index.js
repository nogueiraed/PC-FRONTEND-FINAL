//http://localhost:3000/src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalContext from "./Components/Context/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContext>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </GlobalContext>
  </React.StrictMode>
);

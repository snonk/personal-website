import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ProjsetApp from "./components/ProjsetApp.jsx";

// renders React Component "Root" into the DOM element with ID "root"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ProjsetApp />
  </BrowserRouter>
);

// allows for live updating
module.hot.accept();

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/inter";
import "@fontsource-variable/bricolage-grotesque";
import App from "./App";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages are pre-built as HTML at build time (scripts/prerender.mjs), so we
// attach to that HTML. In `npm run dev` the root is empty, so render fresh.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);

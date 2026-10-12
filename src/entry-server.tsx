// Build-time renderer used by scripts/prerender.mjs to turn each page into
// plain HTML, so search engines, link previews and slow phones get the
// content straight away.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { ROUTES, NOT_FOUND, headFor } from "./lib/seo";
export { SITE } from "./lib/site";

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}

// Runs after `vite build`. Renders every page to static HTML with its own
// title, description and schema, then writes sitemap.xml and 404.html.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const { render, ROUTES, NOT_FOUND, headFor, SITE } = ssr;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--head-->")) throw new Error("index.html is missing <!--head-->");

function page(route, url = route.path) {
  const html = render(url);
  return template
    .replace("<!--head-->", headFor(route))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

for (const r of ROUTES) {
  // Cloudflare Pages serves /pricing from pricing.html (no trailing slash).
  const file = r.path === "/" ? "index.html" : `${r.path.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), page(r));
  console.log("  prerendered", r.path);
}
fs.writeFileSync(path.join(dist, "404.html"), page(NOT_FOUND, "/404"));

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${SITE.url}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("  wrote sitemap.xml and 404.html");

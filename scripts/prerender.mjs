// Stil notu: Üretilen HTML şablonuna her rota için tam içerik + meta + JSON-LD + modulepreload yerleştirir;
// sitemap.xml, robots.txt ve 404.html üretir. dist/public'ta temiz URL'ler elde edilir.
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distPublic = path.join(root, "dist", "public");
const distServer = path.join(root, "dist", "server");

const { renderPage, getRoutes, getRouteMeta, buildJsonLd, SITE_URL } = await import(
  pathToFileURL(path.join(distServer, "entry-server.mjs")).href
);

const SEO_START = "<!--SEO:START-->";
const SEO_END = "<!--SEO:END-->";
const SEO_BLOCK_RE = new RegExp(SEO_START + "[\\s\\S]*?" + SEO_END);

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeJsonLd(objects) {
  return JSON.stringify(objects).replace(/</g, "\\u003c");
}

function preloadLinks(manifest, pageModule) {
  const links = [];
  const seen = new Set();
  const key = Object.keys(manifest).find((k) => k === pageModule || k.endsWith(`/${pageModule}`));
  if (!key) return "";
  const collect = (moduleId) => {
    const entry = manifest[moduleId];
    if (!entry || seen.has(moduleId)) return;
    seen.add(moduleId);
    if (entry.file) links.push(`<link rel="modulepreload" href="/${entry.file}">`);
    for (const dep of entry.imports ?? []) collect(dep);
  };
  collect(key);
  return links.join("\n    ");
}

function buildHead(meta, objects, preloads) {
  const url = meta.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`;
  const image = `${SITE_URL}/og-image.png`;
  const type = meta.productSlug ? "product" : "website";
  return `${SEO_START}
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="robots" content="${escapeHtml(meta.robots)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="DLI Studios" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" id="seo-jsonld">${safeJsonLd(objects)}</script>
    ${preloads}
  ${SEO_END}`;
}

async function main() {
  const template = await readFile(path.join(distPublic, "index.html"), "utf8");
  const manifest = JSON.parse(await readFile(path.join(distPublic, ".vite", "manifest.json"), "utf8"));

  const routes = getRoutes();
  const sitemapUrls = [];

  for (const route of routes) {
    const bodyHtml = await renderPage(route.path);
    const meta = getRouteMeta(route.path);
    const objects = buildJsonLd(route.path);
    const preloads = preloadLinks(manifest, route.pageModule);

    const html = template
      .replace(SEO_BLOCK_RE, () => buildHead(meta, objects, preloads))
      .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    if (route.path === "/") {
      await writeFile(path.join(distPublic, "index.html"), html);
      sitemapUrls.push(SITE_URL + "/");
    } else {
      const dir = path.join(distPublic, route.path.slice(1));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "index.html"), html);
      sitemapUrls.push(SITE_URL + route.path + "/");
    }
    console.log("prerendered", route.path);
  }

  const notFoundHtml = await renderPage("/__not_found__");
  const notFoundMeta = getRouteMeta("/__not_found__");
  const notFoundObjects = buildJsonLd("/__not_found__");
  await writeFile(
    path.join(distPublic, "404.html"),
    template
      .replace(SEO_BLOCK_RE, () => buildHead(notFoundMeta, notFoundObjects, ""))
      .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`),
  );
  console.log("prerendered 404.html");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((url) => `  <url><loc>${url}</loc><lastmod>2026-08-14</lastmod></url>`)
  .join("\n")}
</urlset>
`;
  await writeFile(path.join(distPublic, "sitemap.xml"), sitemap);

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(path.join(distPublic, "robots.txt"), robots);
  console.log("wrote sitemap.xml + robots.txt");
}

main().catch((error) => {
  console.error("[prerender]", error);
  process.exit(1);
});

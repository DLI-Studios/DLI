// Stil notu: SPA gezinmesinde title/meta/canonical/og/twitter/robots ve JSON-LD'yi günceller.
import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE_URL, buildJsonLd, canonicalUrl, getRouteMeta } from "@/lib/seo";

function setMetaContent(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkHref(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(objects: Record<string, unknown>[]) {
  const existing = document.getElementById("seo-jsonld");
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "seo-jsonld";
  script.textContent = JSON.stringify(objects);
  document.head.appendChild(script);
}

export function SeoUpdater() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = getRouteMeta(location);
    const url = canonicalUrl(location);
    const image = `${SITE_URL}/og-image.png`;
    document.title = meta.title;
    setMetaContent("description", meta.description);
    setMetaContent("robots", meta.robots);
    setLinkHref("canonical", url);
    setMetaProperty("og:title", meta.title);
    setMetaProperty("og:description", meta.description);
    setMetaProperty("og:url", url);
    setMetaProperty("og:type", meta.productSlug ? "product" : "website");
    setMetaProperty("og:image", image);
    setMetaProperty("og:site_name", "DLI Studios");
    setMetaContent("twitter:title", meta.title);
    setMetaContent("twitter:description", meta.description);
    setMetaContent("twitter:card", "summary_large_image");
    setMetaContent("twitter:image", image);
    setJsonLd(buildJsonLd(location));
  }, [location]);
  return null;
}

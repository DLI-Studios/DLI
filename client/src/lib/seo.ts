// Stil notu: SEO verileri DOM'dan bağımsızdır; hem Node (prerender) hem istemci (SeoUpdater) tarafında kullanılır.
import { products } from "./site";

export const SITE_URL = "https://dlistudios.dpdns.org";
export const SITE_NAME = "DLI Studios";

export type RouteDef = {
  path: string;
  title: string;
  description: string;
  robots: string;
  pageModule: string;
  productSlug?: string;
};

const DEFAULT_ROBOTS = "index, follow";

const STATIC_ROUTES: RouteDef[] = [
  {
    path: "/",
    title: "DLI Studios — The ecosystem behind your game",
    description:
      "DLI Studios builds the infrastructure, software and experiences that connect players, creators and communities.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/Home.tsx",
  },
  {
    path: "/products",
    title: "DLI Products — The tools around the moment",
    description:
      "DLI is a connected set of surfaces designed to make discovery, play, infrastructure and community feel like one considered experience.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/Products.tsx",
  },
  {
    path: "/technology",
    title: "DLI Technology — A system that stays out of the way",
    description:
      "The best infrastructure is felt in the experience, not in the interface. DLI Core gives every product a shared language and every community room to grow.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/Technology.tsx",
  },
  {
    path: "/about",
    title: "About DLI Studios — We build what sits between people and play",
    description:
      "DLI Studios is building a modern gaming ecosystem for the way players, creators and communities actually move through worlds.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/About.tsx",
  },
  {
    path: "/documentation",
    title: "Documentation — DLI Studios",
    description:
      "A growing reference for the products and ideas behind DLI Studios. Start with the model, then go deeper when you need to.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/Documentation.tsx",
  },
  {
    path: "/contact",
    title: "Contact — DLI Studios",
    description:
      "Tell us what you are building, where the experience gets stuck or what you want to make feel closer.",
    robots: DEFAULT_ROBOTS,
    pageModule: "src/pages/Contact.tsx",
  },
];

const PRODUCT_ROUTES: RouteDef[] = products.map((product) => ({
  path: `/products/${product.slug}`,
  title: `${product.name} — DLI Studios`,
  description: product.shortDescription,
  robots: DEFAULT_ROBOTS,
  pageModule: "src/pages/ProductDetail.tsx",
  productSlug: product.slug,
}));

const NOT_FOUND_ROUTE: RouteDef = {
  path: "/404",
  title: "Page not found — DLI Studios",
  description: "The page you are looking for does not exist or may have moved.",
  robots: "noindex, follow",
  pageModule: "src/pages/NotFound.tsx",
};

export function getRoutes(): RouteDef[] {
  return [...STATIC_ROUTES, ...PRODUCT_ROUTES];
}

export function getRouteMeta(path: string): RouteDef {
  let clean = path.split("?")[0].split("#")[0];
  if (clean.length > 1) clean = clean.replace(/\/+$/, "");
  const exact = STATIC_ROUTES.find((route) => route.path === clean);
  if (exact) return exact;
  const productMatch = PRODUCT_ROUTES.find((route) => route.path === clean);
  if (productMatch) return productMatch;
  return NOT_FOUND_ROUTE;
}

export function canonicalUrl(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  if (clean === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

export function buildJsonLd(path: string): Record<string, unknown>[] {
  const meta = getRouteMeta(path);
  const pageUrl = canonicalUrl(path);

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DLI Studios",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ["https://github.com", "https://discord.com"],
  };

  const webSite: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "DLI Studios",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbs: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    ],
  };

  if (meta.productSlug) {
    const product = products.find((item) => item.slug === meta.productSlug);
    if (product) {
      breadcrumbs.itemListElement = [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
        { "@type": "ListItem", position: 3, name: product.name, item: pageUrl },
      ];
      return [
        organization,
        webSite,
        breadcrumbs,
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${pageUrl}/#product`,
          name: product.name,
          description: product.description,
          applicationCategory: "GameApplication",
          operatingSystem: "Windows",
          url: pageUrl,
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      ];
    }
  }

  if (meta.path === "/products") {
    breadcrumbs.itemListElement = [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: pageUrl },
    ];
    return [organization, webSite, breadcrumbs];
  }

  if (meta.path === "/") return [organization, webSite];

  return [organization];
}
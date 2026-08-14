// Stil notu: SSR girişi — her rota için tam HTML üretir. Sayfalar lazy yerine doğrudan import edilir
// ve Suspense sarmalayıcısı kullanılmaz; böylece içerik konumunda, eksiksiz ve fallback'siz üretilir.
// wouter'ın memoryLocation hook'u getServerSnapshot sağlamadığı için static SSR hook'u burada tanımlanır.
import { Writable } from "node:stream";
import { useSyncExternalStore } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Router, Route, Switch } from "wouter";
import type { BaseLocationHook } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ClientOnly } from "./components/client-only";
import { SeoUpdater } from "./components/seo-updater";
import { SiteLayout } from "./components/site-layout";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Technology from "./pages/Technology";
import About from "./pages/About";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function createStaticLocationHook(path: string): BaseLocationHook {
  let currentPath = path;
  const listeners = new Set<() => void>();
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  const getSnapshot = () => currentPath;
  const getServerSnapshot = () => path;
  return () => [
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
    () => null,
  ];
}

function PageRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/technology" component={Technology} />
      <Route path="/about" component={About} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <ClientOnly>
            <Toaster />
          </ClientOnly>
          <SeoUpdater />
          <SiteLayout>
            <PageRoutes />
          </SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export function renderPage(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    let settled = false;
    const stream = renderToPipeableStream(
      <Router hook={createStaticLocationHook(path)}>
        <AppShell />
      </Router>,
      {
        onAllReady() {
          stream.pipe(
            new Writable({
              write(chunk, _enc, callback) {
                html += chunk.toString();
                callback();
              },
              final(callback) {
                if (!settled) {
                  settled = true;
                  resolve(html);
                }
                callback();
              },
            }),
          );
        },
        onShellError(error) {
          if (!settled) {
            settled = true;
            reject(error);
          }
        },
        onError(error) {
          console.error("[ssr]", error);
        },
      },
    );
  });
}

export { getRoutes, getRouteMeta, buildJsonLd, SITE_URL } from "./lib/seo";

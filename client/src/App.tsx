// Stil notu: Uygulama koyu temayı varsayılan olarak kilitler; sayfalar ortak DLI ürün kabuğunda lazy-load edilir.
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteLayout } from "./components/site-layout";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Technology = lazy(() => import("./pages/Technology"));
const About = lazy(() => import("./pages/About"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={<div className="loading-screen"><span className="signal-dot" /> Loading surface…</div>}>
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
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <SiteLayout><Router /></SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

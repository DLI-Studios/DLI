// Stil notu: Uygulama koyu temayı varsayılan olarak kilitler; sayfalar ortak DLI ürün kabuğunda render edilir.
// Sayfalar eager import edilir ve Suspense kullanılmaz: SSR üretilen HTML ile istemci ağacı birebir aynı
// olur, böylece hydration uyumsuzluğu oluşmaz ve içerik konumunda, fallback'siz kalır.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ClientOnly } from "./components/client-only";
import { SeoUpdater } from "./components/seo-updater";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteLayout } from "./components/site-layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Technology from "./pages/Technology";
import About from "./pages/About";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Router() {
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <ClientOnly><Toaster /></ClientOnly>
          <SeoUpdater />
          <SiteLayout><Router /></SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

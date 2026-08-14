// Stil notu: İstemci girişi — SSR ile üretilen HTML'i hydrate eder; fontları self-host olarak yükler.
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./index.css";

hydrateRoot(document.getElementById("root")!, <App />);

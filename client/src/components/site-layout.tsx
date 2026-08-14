// Stil notu: Tüm sayfalar aynı koyu ürün kabuğu içinde yaşar; navigasyon ve footer her rotada kaçış yolu sağlar.
import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
export function SiteLayout({ children }: PropsWithChildren) { return <div className="site-shell"><Navbar /><main>{children}</main><Footer /></div>; }


// Stil notu: Navigasyon, DLI’nin premium yazılım kimliğini koruyan sakin bir üst çerçevedir; aktiflik mor sinyal ile gösterilir.
import { Menu, MoveUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { BrandMark } from "./brand-mark";
import { navItems } from "@/lib/site";
export function Navbar() {
  const [location] = useLocation(); const [open, setOpen] = useState(false); useEffect(() => setOpen(false), [location]);
  return <header className="site-nav"><div className="container flex h-[74px] items-center justify-between"><BrandMark /><nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href || (item.href === "/products" && location.startsWith("/products/")) ? "nav-link--active" : ""}`}>{item.label}</Link>)}</nav><div className="hidden items-center gap-4 md:flex"><Link href="/contact" className="nav-link nav-link--muted">Get in touch</Link><Link href="/products" className="button button--small button--primary">Explore DLI <MoveUpRight size={14} /></Link></div><button type="button" className="icon-button md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div><div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}><div className="container flex flex-col gap-2 pb-7 pt-3">{navItems.map((item) => <Link key={item.href} href={item.href} className="mobile-nav__link">{item.label}<MoveUpRight size={16} /></Link>)}<Link href="/contact" className="button button--primary mt-4 justify-center">Get in touch <MoveUpRight size={15} /></Link></div></div></header>;
}


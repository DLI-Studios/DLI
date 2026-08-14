// Stil notu: Her ürün yüzeyi DLI’nin operating system dilini gerçek UI parçaları, metadata ve Purple Signal Line enerjisiyle taşır.
import { ArrowUpRight, Check, Circle, Command, Layers3, MessageSquare, Radio, Search, Users } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@/lib/site";

export function ProductMockup({ product }: { product: Product }) {
  return (
    <div className={`product-surface__mockup product-surface__mockup--${product.slug}`} aria-hidden="true">
      <div className="mockup-topbar">
        <span className="mockup-brand"><Circle size={7} fill="currentColor" /> DLI / {product.icon}</span>
        <span className="mockup-status"><span className="signal-dot" /> CONNECTED</span>
      </div>
      {product.slug === "launcher" && <div className="mockup-launcher"><aside><span className="mockup-icon"><Command size={13} /></span><span className="mockup-icon mockup-icon--active"><Layers3 size={13} /></span><span className="mockup-icon"><Users size={13} /></span></aside><div className="mockup-content"><span className="mockup-caption">YOUR LIBRARY / 12 ITEMS</span><div className="mockup-feature-row"><div><div className="mockup-line mockup-line--wide" /><div className="mockup-line mockup-line--short" /></div><span className="mockup-purple-block" /></div><div className="mockup-card-row"><span /><span /><span /></div></div></div>}
      {product.slug === "client" && <div className="mockup-client"><div className="mockup-world" /><div className="mockup-client-panel"><span className="mockup-caption">IN SESSION / 04</span><div className="mockup-line mockup-line--wide" /><div className="mockup-line mockup-line--short" /></div><span className="mockup-hud">DLI CLIENT <b>ONLINE</b></span></div>}
      {product.slug === "core" && <div className="mockup-core">{["IDENTITY", "SERVICES", "PRESENCE"].map((layer, index) => <div className="mockup-core-row" key={layer}><span>0{index + 1}</span><b>{layer}</b><i /></div>)}</div>}
      {product.slug === "connect" && <div className="mockup-connect"><div className="mockup-connect-header"><span className="mockup-line mockup-line--short" /><Search size={13} /></div>{["CREATOR / 04", "COMMUNITY / 12", "PLAYER / 28"].map((item) => <div className="mockup-connect-row" key={item}><span className="mockup-avatar" /><span>{item}</span><MessageSquare size={11} /></div>)}</div>}
    </div>
  );
}

export function ProductSurface({ product, large = false, offset = false }: { product: Product; large?: boolean; offset?: boolean }) {
  return (
    <article className={`product-surface ${large ? "product-surface--large" : ""} ${offset ? "product-surface--offset" : ""}`}>
      <ProductMockup product={product} />
      <div className="product-surface__body">
        <div><div className="mb-4 flex items-center gap-3"><span className="product-index">{product.icon}</span><span className="eyebrow">{product.eyebrow}</span></div><h3 className="text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">{product.name}</h3><p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{product.shortDescription}</p></div>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"><Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-violet-300">Explore product <ArrowUpRight size={15} strokeWidth={1.5} /></Link><span className="h-px w-10 bg-white/10" aria-hidden="true" /><span className="text-xs uppercase tracking-[0.16em] text-slate-600">{product.features.length} layers</span></div>
        {large && <div className="mt-8 grid gap-2 border-t border-white/8 pt-5 sm:grid-cols-3">{product.features.map((feature) => <span key={feature} className="flex items-start gap-2 text-xs leading-5 text-slate-500"><Check size={13} className="mt-0.5 shrink-0 text-violet-400" /> {feature}</span>)}</div>}
      </div>
    </article>
  );
}

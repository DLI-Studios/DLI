// Stil notu: Ürün detayları ekran görüntüsü yerine katmanlı UI mockup, metadata ve Purple Signal Line ile gerçek bir ürün yüzeyi gibi davranır.
import { ArrowLeft, ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { PageHero } from "@/components/page-hero";
import { ProductMockup } from "@/components/product-surface";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/site";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === slug);
  useEffect(() => { if (product) document.title = `${product.name} — DLI Studios`; return () => { document.title = "DLI Studios — The ecosystem behind your game"; }; }, [product]);
  if (!product) return <div className="container py-40"><h1 className="display-title">Product not found.</h1><Link href="/products" className="text-link mt-8">Back to products <ArrowUpRight size={15} /></Link></div>;
  const next = products[(products.findIndex((item) => item.slug === product.slug) + 1) % products.length];
  return <div><PageHero index={product.icon} eyebrow={product.eyebrow} title={product.name} description={product.description}><Link href="/products" className="text-link mt-8"><ArrowLeft size={15} /> All products</Link></PageHero><section className="section-space"><div className="container"><Reveal><div className="detail-media"><ProductMockup product={product} /><div className="detail-media__meta"><span>DLI / {product.icon}</span><span>PRODUCT SURFACE / {product.eyebrow}</span></div></div></Reveal><div className="mt-20 grid gap-12 lg:grid-cols-[0.7fr_1fr]"><Reveal><p className="eyebrow text-violet-300">WHY IT EXISTS</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">A clearer way to move through the ecosystem.</h2></Reveal><Reveal delay={0.08}><p className="text-lg leading-8 text-slate-400">{product.detail}</p><div className="mt-9 grid gap-3 border-t border-white/8 pt-7 sm:grid-cols-3">{product.features.map((feature) => <div key={feature} className="text-sm text-slate-300"><Check size={15} className="mb-3 text-violet-300" />{feature}</div>)}</div></Reveal></div></div></section><section className="section-space section-space--tight border-y border-white/8 bg-[#0B0B10]"><div className="container"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow text-violet-300">NEXT IN THE SYSTEM</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">Keep exploring.</h2></div><Link href={`/products/${next.slug}`} className="button button--ghost">Next product <MoveUpRight size={15} /></Link></div></div></section></div>;
}

// Stil notu: Ürünler sayfası kart galerisi değil, DLI ekosisteminin dört farklı ürün yüzeyini editoryal ritimle anlatır.
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "@/components/page-hero";
import { ProductSurface } from "@/components/product-surface";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/site";
export default function Products() { return <div><PageHero index="01" eyebrow="PRODUCT ECOSYSTEM" title="The tools around the moment." description="DLI is a connected set of surfaces designed to make discovery, play, infrastructure and community feel like one considered experience." /><section className="section-space"><div className="container space-y-8">{products.map((product, index) => <Reveal key={product.slug} delay={index * 0.04}><ProductSurface product={product} large offset={index % 2 === 1} /></Reveal>)}</div></section><section className="section-space section-space--tight border-y border-white/8 bg-[#0B0B10]"><div className="container flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow text-violet-300">A BETTER DEFAULT</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">Every surface earns its place.</h2></div><Link href="/technology" className="text-link">See the layer underneath <ArrowUpRight size={15} /></Link></div></section></div>; }

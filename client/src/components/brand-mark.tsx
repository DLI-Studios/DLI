// Stil notu: DLI’nin monoline D/L işaretini mor sinyal ile, metin wordmark’ını sade ve teknik tutar.
import { Link } from "wouter";
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-3" aria-label="DLI Studios home"><span className="brand-mark" aria-hidden="true"><img className="brand-mark__image" src="/logo.png" alt="" /></span>{!compact && <span className="flex flex-col leading-none"><span className="text-[15px] font-semibold tracking-[-0.03em] text-white">DLI</span><span className="mt-1 text-[8px] font-medium uppercase tracking-[0.2em] text-slate-500">Studios</span></span>}</Link>;
}

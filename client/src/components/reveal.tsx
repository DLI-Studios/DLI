// Stil notu: DLI’de hareket ürün hiyerarşisini destekler; gösterişli efekt yerine kısa opacity/transform geçişi kullanır.
// SSR HTML içerik görünür gelir; istemcide .js sınıfı CSS geçişini etkinleştirir ve IntersectionObserver .is-visible ekler.
import { useEffect, useRef, type CSSProperties, type PropsWithChildren } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  ...props
}: PropsWithChildren<{ delay?: number; className?: string; style?: CSSProperties } & Record<string, unknown>>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "-80px", threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

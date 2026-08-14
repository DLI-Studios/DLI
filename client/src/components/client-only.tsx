// Stil notu: SSR sırasında render edilemeyen bileşenleri (document erişimi olanlar) yalnızca istemcide açar.
import { useEffect, useState, type PropsWithChildren } from "react";

export function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
}

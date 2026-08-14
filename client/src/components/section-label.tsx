// Stil notu: Purple Signal Line her section numarasını ürün işletim sistemi boyunca görünür bir sinir ağına bağlar.
export function SectionLabel({ index, children }: { index: string; children: string }) { return <div className="section-label"><span className="section-label__bar" aria-hidden="true" /><span className="section-label__index">{index}</span><span>{children}</span></div>; }

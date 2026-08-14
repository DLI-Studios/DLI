// Stil notu: DLI’de hareket ürün hiyerarşisini destekler; gösterişli efekt yerine kısa opacity/transform geçişi kullanır.
import { motion, type MotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";
export function Reveal({ children, delay = 0, className = "", ...props }: PropsWithChildren<MotionProps & { delay?: number; className?: string }>) { return <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }} {...props}>{children}</motion.div>; }


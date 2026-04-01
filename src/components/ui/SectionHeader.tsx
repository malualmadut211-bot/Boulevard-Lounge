import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ label, title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  const { ref, isInView } = useInView(0.3);

  return (
    <div ref={ref} className={cn("mb-16", centered && "text-center")}>
      <motion.span
        className={cn(
          "section-label mb-4 block",
          light && "text-brand-gold before:bg-brand-gold"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.span>

      <AnimatedText
        text={title}
        as="h2"
        className={cn(
          "font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6",
          light ? "text-white" : "text-text-primary"
        )}
      />

      {subtitle && (
        <motion.p
          className={cn(
            "font-inter text-base md:text-lg max-w-2xl leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/70" : "text-text-secondary"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

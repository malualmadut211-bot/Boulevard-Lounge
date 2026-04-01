import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "word" | "letter";
  staggerDelay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  as: Component = "h2",
  splitBy = "word",
  staggerDelay = 0.05,
}: AnimatedTextProps) {
  const { ref, isInView } = useInView(0.3);
  const units = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Component ref={ref as any} className={cn("overflow-hidden", className)}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 60, opacity: 0, rotateX: 40 }}
          animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {unit}
          {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}

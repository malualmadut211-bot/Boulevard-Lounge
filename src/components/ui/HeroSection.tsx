import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  label: string;
  title: string;
  subtitle?: string;
  backgroundClass: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  height?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  label,
  title,
  subtitle,
  backgroundClass,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  height = "h-[80vh]",
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        height,
        backgroundClass
      )}
    >
      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-gold/40"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-16">
        <motion.span
          className="inline-block font-montserrat text-[10px] md:text-xs uppercase tracking-[5px] font-semibold text-brand-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {label}
        </motion.span>

        <AnimatedText
          text={title}
          as="h1"
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          splitBy="word"
          staggerDelay={0.08}
        />

        {subtitle && (
          <motion.p
            className="font-cormorant text-lg md:text-xl lg:text-2xl italic text-white/80 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaText || secondaryCtaText) && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {ctaText && (
              <MagneticButton href={ctaHref} variant="primary">
                {ctaText}
              </MagneticButton>
            )}
            {secondaryCtaText && (
              <MagneticButton href={secondaryCtaHref} variant="ghost">
                {secondaryCtaText}
              </MagneticButton>
            )}
          </motion.div>
        )}

        {children}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-montserrat text-[9px] uppercase tracking-[3px] text-white/50">
          Scroll to Explore
        </span>
        <motion.div
          className="w-[1px] h-8 bg-white/30"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles = cn(
    "inline-flex items-center justify-center font-montserrat text-[11px] uppercase tracking-[2px] font-semibold rounded-full transition-all duration-300",
    variant === "primary" && "btn-liquid bg-brand-brown text-white px-8 py-4",
    variant === "ghost" && "btn-ghost border-2 border-white text-white px-8 py-4",
    variant === "outline" && "btn-liquid border-2 border-brand-brown text-brand-brown px-8 py-4 hover:text-white",
    className
  );

  if (href) {
    const content = (
      <motion.div
        ref={ref as any}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
        className={baseStyles}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );

    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return <a href={href}>{content}</a>;
    }
    return <Link to={href}>{content}</Link>;
  }

  return (
    <motion.button
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={baseStyles}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}

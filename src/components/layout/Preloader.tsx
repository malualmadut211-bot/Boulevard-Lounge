import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("boulevard-visited");
      if (hasVisited) {
        setShouldShow(false);
        setIsLoading(false);
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("boulevard-visited", "true");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Left Curtain */}
          <motion.div
            className="fixed inset-0 w-1/2 left-0 bg-surface-cream z-[10000]"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          {/* Right Curtain */}
          <motion.div
            className="fixed inset-0 w-1/2 right-0 left-auto bg-surface-cream z-[10000]"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          {/* Logo in center */}
          <motion.div
            className="fixed inset-0 z-[10001] flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              {/* Logo SVG with stroke animation */}
              <motion.svg
                width="280"
                height="80"
                viewBox="0 0 280 80"
                className="mx-auto mb-4"
              >
                <motion.text
                  x="50%"
                  y="45"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-playfair"
                  fontSize="36"
                  fontWeight="700"
                  fill="none"
                  stroke="#974A02"
                  strokeWidth="1.5"
                  initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                  animate={{
                    strokeDashoffset: 0,
                    fill: "#974A02",
                    transition: {
                      strokeDashoffset: { duration: 2, ease: "easeInOut" },
                      fill: { duration: 0.8, delay: 1.8 },
                    },
                  }}
                >
                  BOULEVARD
                </motion.text>
                <motion.text
                  x="50%"
                  y="70"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-montserrat"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="6"
                  fill="none"
                  stroke="#974A02"
                  strokeWidth="0.8"
                  initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                  animate={{
                    strokeDashoffset: 0,
                    fill: "#8E4500",
                    transition: {
                      strokeDashoffset: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
                      fill: { duration: 0.8, delay: 2 },
                    },
                  }}
                >
                  LOUNGE BAR & GRILL
                </motion.text>
              </motion.svg>

              {/* Loading bar */}
              <motion.div className="w-48 h-[2px] bg-border-light mx-auto rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-brown rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Gold shimmer particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-brand-gold"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: `${40 + Math.random() * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, (Math.random() - 0.5) * 40, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3 + 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

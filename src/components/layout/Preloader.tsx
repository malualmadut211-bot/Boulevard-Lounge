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
            className="fixed inset-0 w-1/2 left-0 bg-surface-dark z-[10000]"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
          {/* Right Curtain */}
          <motion.div
            className="fixed inset-0 w-1/2 right-0 left-auto bg-surface-dark z-[10000]"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
          {/* Logo in center */}
          <motion.div
            className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center flex flex-col items-center">
              <motion.img
                src="https://github.com/malualmadut211-bot/ai-studio-media/blob/8390a8ab3d9e0a4a84077fdd236638ad49075aca/ChatGPT%20Image%20Apr%202%2C%202026%2C%2012_22_51%20PM.png?raw=true"
                alt="Boulevard Logo"
                className="w-48 md:w-64 mb-8 object-contain"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Loading bar */}
              <motion.div 
                className="w-48 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div
                  className="h-full bg-brand-gold rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
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

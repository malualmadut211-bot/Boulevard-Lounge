import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const overlayVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scaleX: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const handleExitComplete = () => {
    window.scrollTo(0, 0);
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <motion.div key={location.pathname}>
        <motion.div
          className="fixed inset-0 bg-surface-cream z-[9999] origin-left pointer-events-none"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

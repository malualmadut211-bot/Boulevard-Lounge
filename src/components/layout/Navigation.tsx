import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Phone, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-luxury",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex-shrink-0">
              <motion.div
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className={cn(
                    "font-playfair text-xl md:text-2xl font-bold transition-colors duration-400",
                    isScrolled ? "text-brand-brown" : "text-white"
                  )}
                >
                  BOULEVARD
                </span>
                <span
                  className={cn(
                    "font-montserrat text-[8px] md:text-[9px] tracking-[4px] uppercase transition-colors duration-400",
                    isScrolled ? "text-brand-copper" : "text-white/80"
                  )}
                >
                  Lounge Bar & Grill
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-3 xl:px-4 py-2 font-montserrat text-[11px] xl:text-[12px] uppercase tracking-[2px] font-semibold transition-colors duration-300 link-underline",
                    isScrolled
                      ? pathname === link.href
                        ? "text-brand-brown"
                        : "text-text-primary hover:text-brand-brown"
                      : pathname === link.href
                      ? "text-brand-gold"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-brown"
                      layoutId="activeNav"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className={cn(
                  "flex items-center gap-2 font-montserrat text-xs transition-colors duration-300",
                  isScrolled ? "text-text-secondary hover:text-brand-brown" : "text-white/80 hover:text-white"
                )}
              >
                <Phone size={14} />
                <span className="hidden xl:inline">Call Us</span>
              </a>
              <Link
                to="/reservations"
                className="btn-liquid bg-brand-brown text-white font-montserrat text-[11px] uppercase tracking-[2px] font-semibold px-6 py-3 rounded-full"
              >
                Reserve a Table
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden relative w-8 h-6 flex flex-col justify-between z-[110]"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className={cn(
                  "block h-[2px] w-full rounded-full transition-colors duration-300",
                  isMobileOpen || isScrolled ? "bg-brand-brown" : "bg-white"
                )}
                animate={isMobileOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={cn(
                  "block h-[2px] w-full rounded-full transition-colors duration-300",
                  isMobileOpen || isScrolled ? "bg-brand-brown" : "bg-white"
                )}
                animate={isMobileOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={cn(
                  "block h-[2px] w-full rounded-full transition-colors duration-300",
                  isMobileOpen || isScrolled ? "bg-brand-brown" : "bg-white"
                )}
                animate={isMobileOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[105] bg-surface-dark/[0.97] noise-overlay flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "font-playfair text-3xl md:text-4xl transition-colors duration-300",
                      pathname === link.href ? "text-brand-gold" : "text-white/90 hover:text-brand-brown"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <Link
                  to="/reservations"
                  className="btn-liquid bg-brand-brown text-white font-montserrat text-sm uppercase tracking-[3px] font-semibold px-10 py-4 rounded-full"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Reserve a Table
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-white/60 font-montserrat text-sm"
                >
                  {SITE_CONFIG.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

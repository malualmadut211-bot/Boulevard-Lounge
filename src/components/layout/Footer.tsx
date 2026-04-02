import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

export function Footer() {
  const { ref, isInView } = useInView(0.1);
  const [email, setEmail] = useState("");

  return (
    <footer ref={ref} className="relative bg-surface-dark text-white noise-overlay overflow-hidden">
      {/* Newsletter Strip */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl mb-2">Stay in the Loop</h3>
              <p className="text-white/60 font-inter text-sm">
                Get exclusive offers, event invites & more.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-72 px-5 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-white/40 font-inter text-sm focus:outline-none focus:border-brand-brown focus:shadow-[0_0_20px_rgba(151,74,2,0.3)] transition-all duration-300"
              />
              <button className="btn-liquid bg-brand-brown text-white font-montserrat text-xs uppercase tracking-[2px] font-semibold px-8 py-3 rounded-full whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="mb-6">
              <h2 className="font-playfair text-2xl font-bold text-white mb-1">
                BOULEVARD
              </h2>
              <p className="font-montserrat text-[8px] tracking-[4px] uppercase text-brand-gold">
                Lounge Bar & Grill
              </p>
            </div>
            <p className="font-cormorant text-lg italic text-white/70 mb-4">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>
            <p className="font-inter text-sm text-white/50 leading-relaxed">
              Juba&apos;s premier destination for exceptional dining, handcrafted cocktails, and unforgettable
              experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-montserrat text-sm uppercase tracking-[3px] font-semibold text-brand-gold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-inter text-sm text-white/60 hover:text-white transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-montserrat text-sm uppercase tracking-[3px] font-semibold text-brand-gold mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-brown mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-white/60">{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-brown flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="font-inter text-sm text-white/60 hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-brown flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-inter text-sm text-white/60 hover:text-white transition-colors break-all">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-brand-brown flex-shrink-0" />
                <span className="font-inter text-sm text-white/60 flex items-center gap-2">
                  {SITE_CONFIG.hours}
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-montserrat text-sm uppercase tracking-[3px] font-semibold text-brand-gold mb-6">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
                { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
                { icon: Twitter, href: SITE_CONFIG.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-brand-brown hover:border-brand-brown hover:text-white transition-all duration-400"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="mt-8">
              <p className="font-montserrat text-[10px] uppercase tracking-[3px] text-white/40 mb-3">
                Rating
              </p>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg">★</span>
                ))}
                <span className="font-inter text-sm text-white/60 ml-1">5.0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-xs text-white/40">
              © 2025 Boulevard Lounge Bar & Grill. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-brown/5 rounded-full blur-[200px] pointer-events-none" />
    </footer>
  );
}

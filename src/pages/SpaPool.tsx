import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { useInView } from "@/hooks/useInView";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Heart, Droplets, Sun, Flower2, Hand } from "lucide-react";

const spaServices = [
  { icon: Hand, title: "Massage Therapy", desc: "Release tension and restore balance with our range of massage therapies — from deep tissue to relaxation.", image: PLACEHOLDER_IMAGES.spa[0], prices: ["Swedish Massage (60min) — $60", "Deep Tissue (90min) — $85", "Hot Stone (60min) — $75"] },
  { icon: Flower2, title: "Facial Treatments", desc: "Revitalize your skin with our premium facial treatments using high-quality products.", image: PLACEHOLDER_IMAGES.spa[1], prices: ["Classic Facial — $45", "Anti-Aging Facial — $65", "Hydrating Facial — $55"] },
  { icon: Droplets, title: "Body Treatments", desc: "Indulge in luxurious body scrubs, wraps, and treatments that leave you glowing.", image: PLACEHOLDER_IMAGES.spa[2], prices: ["Body Scrub — $50", "Body Wrap — $70", "Full Body Treatment — $90"] },
  { icon: Heart, title: "Wellness Packages", desc: "Combine multiple treatments for the ultimate wellness experience. Perfect for couples and special occasions.", image: PLACEHOLDER_IMAGES.spa[0], prices: ["Day Spa Package — $150", "Couples Package — $250", "VIP Full Day — $300"] },
];

export default function SpaPoolPage() {
  return (
    <>
      <HeroSection
        label="Spa & Pool"
        title="Relax. Rejuvenate. Restore."
        subtitle="Escape the everyday and immerse yourself in pure bliss at our tranquil spa and sparkling poolside."
        backgroundClass="placeholder-hero-spa"
        ctaText="Book Spa Treatment"
        ctaHref="/contact"
        secondaryCtaText="Call to Reserve"
        secondaryCtaHref="tel:+211911133348"
      />

      {/* Spa Services */}
      <section className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Spa Treatments"
            title="Indulge in Pure Relaxation"
            subtitle="Premium treatments designed to rejuvenate your body, mind, and soul."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {spaServices.map((service, i) => (
              <SpaServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Pool Section */}
      <PoolSection />

      {/* Booking CTA */}
      <section className="py-24 bg-surface-cream relative overflow-hidden">
        {/* Botanical pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C30 5 35 15 35 25C35 35 25 35 25 25C25 15 30 5 30 5Z' fill='%23974A02'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimatedText
            text="Ready to Unwind?"
            as="h2"
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
          />
          <p className="font-inter text-base text-text-secondary mb-10">
            Book your spa session or pool visit today and treat yourself to the ultimate relaxation experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton href="/contact" variant="primary">
              Book Spa Treatment
            </MagneticButton>
            <MagneticButton href="tel:+211911133348" variant="outline">
              Call to Reserve
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

function SpaServiceCard({ service, index }: { service: (typeof spaServices)[0]; index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-brown/20"
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <div className="grid sm:grid-cols-2">
        <div className="relative h-64 sm:h-auto overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 img-warm"
          />
          <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/20 transition-all duration-500 flex items-center justify-center">
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                <service.icon size={24} className="text-brand-brown" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-3">
            <service.icon size={20} className="text-brand-brown" />
            <h3 className="font-playfair text-xl font-bold text-text-primary">{service.title}</h3>
          </div>
          <p className="font-inter text-sm text-text-secondary leading-relaxed mb-6">
            {service.desc}
          </p>
          <div className="space-y-2">
            {service.prices.map((price, i) => {
              const [name, cost] = price.split(" — ");
              return (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="font-inter text-text-primary">{name}</span>
                  <span className="font-montserrat font-bold text-brand-brown">{cost}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PoolSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <img
        src={PLACEHOLDER_IMAGES.pool[0]}
        alt="Boulevard Swimming Pool"
        className="object-cover w-full h-full absolute inset-0 img-warm"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,15,5,0.8)] to-[rgba(26,15,5,0.4)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.span
          className="font-montserrat text-[10px] uppercase tracking-[5px] font-semibold text-brand-gold mb-4 block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Swimming Pool
        </motion.span>

        <AnimatedText
          text="Dive Into Paradise"
          as="h2"
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
        />

        <motion.p
          className="font-inter text-base text-white/70 leading-relaxed max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          Our stunning swimming pool is the perfect place to cool off, relax by the poolside with a
          drink, or simply soak up the African sun. Towels, loungers, and poolside service provided.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: Sun, text: "Poolside Loungers" },
            { icon: Droplets, text: "Crystal Clear Water" },
            { icon: Heart, text: "Towel Service" },
            { icon: Flower2, text: "Poolside Dining" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon size={18} className="text-brand-gold" />
              <span className="font-inter text-sm text-white/80">{item.text}</span>
            </div>
          ))}
        </motion.div>

        <MagneticButton href="/contact" variant="ghost">
          Visit the Pool
        </MagneticButton>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-auto fill-surface-cream">
          <motion.path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            animate={{
              d: [
                "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z",
                "M0,50 C240,10 480,70 720,30 C960,60 1200,20 1440,50 L1440,80 L0,80 Z",
                "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}

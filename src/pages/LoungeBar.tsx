import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Music, Wine, Clock, Users } from "lucide-react";

const cocktails = [
  { name: "Boulevard Sunset", desc: "Dark rum, passion fruit, lime, angostura", image: PLACEHOLDER_IMAGES.cocktails[0], price: "$15" },
  { name: "African Gold", desc: "Whiskey, honey, ginger, lemon", image: PLACEHOLDER_IMAGES.cocktails[1], price: "$14" },
  { name: "Nile Breeze", desc: "Gin, elderflower, cucumber, tonic", image: PLACEHOLDER_IMAGES.cocktails[2], price: "$13" },
  { name: "Juba Nights", desc: "Vodka, espresso, vanilla, Kahlua", image: PLACEHOLDER_IMAGES.cocktails[3], price: "$16" },
  { name: "Tropical Storm", desc: "Tequila, mango, jalapeño, lime", image: PLACEHOLDER_IMAGES.cocktails[4], price: "$15" },
];

const drinkCategories = [
  { category: "Signature Cocktails", items: ["Boulevard Sunset — $15", "African Gold — $14", "Nile Breeze — $13", "Juba Nights — $16"] },
  { category: "Classic Cocktails", items: ["Old Fashioned — $14", "Negroni — $13", "Margarita — $12", "Mojito — $11"] },
  { category: "Wines", items: ["House Red (Glass) — $10", "House White (Glass) — $10", "Premium Red (Bottle) — $45", "Prosecco — $50"] },
  { category: "Beers", items: ["Local Draft — $5", "Import Lager — $7", "Craft IPA — $8", "Stout — $8"] },
  { category: "Spirits", items: ["Premium Whiskey — $12", "Vodka — $10", "Gin — $10", "Rum — $10"] },
  { category: "Non-Alcoholic", items: ["Fresh Juices — $6", "Mocktails — $8", "Espresso — $4", "Herbal Tea — $4"] },
];

export default function LoungeBarPage() {
  return (
    <>
      <HeroSection
        label="Lounge & Bar"
        title="Sip. Unwind. Repeat."
        subtitle="Where the night comes alive with handcrafted cocktails, premium spirits, and the smoothest vibes in Juba."
        backgroundClass="placeholder-hero-lounge"
        ctaText="Reserve a Lounge Table"
        ctaHref="/reservations"
      />

      {/* Cocktail Showcase */}
      <section className="py-24 bg-surface-dark relative noise-overlay overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="Signature Cocktails"
            title="Crafted to Perfection"
            subtitle="Each cocktail is a work of art — shaken, stirred, and served with style."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cocktails.map((cocktail, i) => (
              <CocktailCard key={i} cocktail={cocktail} index={i} />
            ))}
          </div>
        </div>

        {/* Animated liquid wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto fill-white">
            <motion.path
              d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,50 1440,50 L1440,100 L0,100 Z"
              animate={{
                d: [
                  "M0,50 C360,100 720,0 1080,50 C1260,75 1380,50 1440,50 L1440,100 L0,100 Z",
                  "M0,60 C360,20 720,80 1080,40 C1260,30 1380,60 1440,60 L1440,100 L0,100 Z",
                  "M0,50 C360,100 720,0 1080,50 C1260,75 1380,50 1440,50 L1440,100 L0,100 Z",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </section>

      {/* Drinks Menu */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Drinks Menu"
            title="Something for Every Taste"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinkCategories.map((cat, i) => (
              <DrinkCategory key={i} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lounge Experience */}
      <section className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <LoungeImage />
            <LoungeText />
          </div>
        </div>
      </section>

      {/* Bar Gallery */}
      <BarGallery />
    </>
  );
}

function CocktailCard({ cocktail, index }: { cocktail: (typeof cocktails)[0]; index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 card-hover"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-playfair text-lg font-bold text-white mb-1">{cocktail.name}</h3>
        <p className="font-inter text-xs text-white/50 mb-2">{cocktail.desc}</p>
        <span className="font-montserrat text-lg font-bold text-brand-gold">{cocktail.price}</span>
      </div>
    </motion.div>
  );
}

function DrinkCategory({ category, index }: { category: (typeof drinkCategories)[0]; index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="bg-surface-cream rounded-2xl p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="font-playfair text-xl font-bold text-text-primary mb-6 pb-3 border-b-2 border-brand-brown">
        {category.category}
      </h3>
      <ul className="space-y-3">
        {category.items.map((item, i) => {
          const [name, price] = item.split(" — ");
          return (
            <li key={i} className="flex items-center justify-between">
              <span className="font-inter text-sm text-text-primary">{name}</span>
              <span className="flex-1 mx-3 border-b border-dotted border-border-light" />
              <span className="font-montserrat text-sm font-bold text-brand-brown">{price}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function LoungeImage() {
  const { ref, isInView } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={PLACEHOLDER_IMAGES.lounge[0]}
        alt="Boulevard Lounge"
        className="object-cover w-full h-full img-warm"
      />
    </motion.div>
  );
}

function LoungeText() {
  const { ref, isInView } = useInView(0.2);
  return (
    <div ref={ref}>
      <motion.span className="section-label mb-4 block" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
        The Lounge
      </motion.span>
      <AnimatedText
        text="Your Night, Your Way"
        as="h2"
        className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mb-6"
      />
      <motion.p
        className="font-inter text-base text-text-secondary leading-[1.9] mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        Sink into plush seating and let the world fade away. Our lounge is the perfect
        setting for intimate conversations, after-work drinks, or a memorable night out.
        With curated playlists, mood lighting, and the finest drinks in Juba, every
        evening at Boulevard is one to remember.
      </motion.p>
      <motion.div className="grid grid-cols-2 gap-6 mb-8">
        {[
          { icon: Music, text: "Live Music Nights" },
          { icon: Wine, text: "Premium Spirits" },
          { icon: Clock, text: "Open Late" },
          { icon: Users, text: "VIP Seating" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <item.icon size={20} className="text-brand-brown" />
            <span className="font-inter text-sm text-text-primary">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
      <MagneticButton href="/reservations" variant="primary">
        Reserve a Lounge Table
      </MagneticButton>
    </div>
  );
}

function BarGallery() {
  const { ref, isInView } = useInView(0.1);
  const images = [...PLACEHOLDER_IMAGES.cocktails, ...PLACEHOLDER_IMAGES.lounge, PLACEHOLDER_IMAGES.restaurant[2]];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Gallery" title="Behind the Bar" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 8).map((img, i) => (
            <motion.div
              key={i}
              className={`group relative rounded-xl overflow-hidden cursor-view ${
                i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <div className={`relative ${i === 0 || i === 5 ? "h-64 md:h-full" : "h-48 md:h-56"}`}>
                <img
                  src={img}
                  alt={`Bar gallery ${i + 1}`}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 img-warm"
                />
                <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

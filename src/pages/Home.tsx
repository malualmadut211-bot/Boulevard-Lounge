import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed, Wine, Waves, Sparkles, PartyPopper, Cookie,
  Clock, Users, Accessibility, Car, ClipboardList, Globe,
  Star, ChevronRight, Instagram, ArrowRight, Phone, MapPin
} from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { useInView } from "@/hooks/useInView";
import { SITE_CONFIG, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ===== OFFERINGS DATA ===== */
const offerings = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant & Dining",
    description: "Savor exquisite flavors with our carefully curated menu featuring local and international cuisine. From hearty mains to our famous desserts, every dish is a masterpiece.",
    image: PLACEHOLDER_IMAGES.food[0],
    link: "/menu",
    linkText: "View Menu →",
  },
  {
    icon: Wine,
    title: "Lounge & Bar",
    description: "Unwind with handcrafted cocktails, premium spirits, and an atmosphere that sets the perfect mood. Our lounge is the ultimate spot for after-hours relaxation.",
    image: PLACEHOLDER_IMAGES.cocktails[0],
    link: "/lounge-bar",
    linkText: "Explore Lounge →",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Dive into crystal-clear waters and soak up the sun by our stunning poolside. Perfect for a refreshing escape any day.",
    image: PLACEHOLDER_IMAGES.pool[0],
    link: "/spa-pool",
    linkText: "Learn More →",
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    description: "Rejuvenate your body and soul with our premium spa treatments. From massages to facials, experience pure relaxation.",
    image: PLACEHOLDER_IMAGES.spa[0],
    link: "/spa-pool",
    linkText: "Discover Spa →",
  },
  {
    icon: PartyPopper,
    title: "Events & Celebrations",
    description: "From intimate dinners to grand celebrations, Boulevard is the perfect venue. We offer customized event planning and impeccable service.",
    image: PLACEHOLDER_IMAGES.events[0],
    link: "/events",
    linkText: "Plan Your Event →",
  },
  {
    icon: Cookie,
    title: "Quick Bites & Desserts",
    description: "Short on time? Grab a quick bite from our selection of small plates and indulge in our legendary desserts.",
    image: PLACEHOLDER_IMAGES.desserts[0],
    link: "/menu",
    linkText: "See Options →",
  },
];

const features = [
  { icon: Clock, title: "Open 24 Hours", desc: "We never close. Whether it's a late-night craving or an early morning coffee, we're here." },
  { icon: Users, title: "Family Friendly", desc: "A welcoming space for families. Kids-friendly menu and atmosphere." },
  { icon: Accessibility, title: "Fully Accessible", desc: "Wheelchair accessible parking and restrooms. Everyone is welcome." },
  { icon: Car, title: "Free Parking", desc: "Complimentary parking lot and free street parking for all guests." },
  { icon: ClipboardList, title: "Reservations Accepted", desc: "Plan ahead. Reserve your table and guarantee your perfect evening." },
  { icon: Globe, title: "Tourist Favorite", desc: "A top-rated destination for tourists and groups visiting Juba." },
];

const testimonials = [
  {
    text: "Absolutely the best dining experience in Juba! The food was incredible, the cocktails were divine, and the atmosphere was pure magic. We'll definitely be back!",
    name: "Sarah M.",
    role: "Food Enthusiast",
  },
  {
    text: "Boulevard Lounge is a hidden gem. From the pool to the spa to the amazing dinner service — it's a complete lifestyle experience. Highly recommend!",
    name: "James K.",
    role: "Travel Blogger",
  },
  {
    text: "Took my family here for a celebration and everything was perfect. The staff were so attentive, the kids loved it, and the desserts were out of this world!",
    name: "Amina R.",
    role: "Regular Guest",
  },
];

const menuPreviewItems = [
  { name: "Grilled Lamb Chops", desc: "Herb-crusted with roasted vegetables", price: "$28", image: PLACEHOLDER_IMAGES.food[1] },
  { name: "Seafood Platter", desc: "Fresh catch with garlic butter sauce", price: "$35", image: PLACEHOLDER_IMAGES.food[2] },
  { name: "Signature Steak", desc: "Prime ribeye with truffle mash", price: "$42", image: PLACEHOLDER_IMAGES.food[3] },
  { name: "Tropical Salad", desc: "Mango, avocado & citrus dressing", price: "$16", image: PLACEHOLDER_IMAGES.food[4] },
  { name: "Chocolate Fondant", desc: "Molten center with vanilla ice cream", price: "$14", image: PLACEHOLDER_IMAGES.desserts[0] },
];

const instagramImages = [
  PLACEHOLDER_IMAGES.food[0], PLACEHOLDER_IMAGES.cocktails[1], PLACEHOLDER_IMAGES.spa[0],
  PLACEHOLDER_IMAGES.pool[0], PLACEHOLDER_IMAGES.events[1], PLACEHOLDER_IMAGES.food[5],
  PLACEHOLDER_IMAGES.lounge[0], PLACEHOLDER_IMAGES.desserts[1],
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Boulevard Lounge Interior"
            className="object-cover w-full h-full img-warm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,15,5,0.55)] via-[rgba(26,15,5,0.45)] to-[rgba(26,15,5,0.75)]" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-brand-gold/30"
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            className="font-montserrat text-[10px] md:text-xs uppercase tracking-[5px] font-semibold text-brand-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Juba&apos;s Premier Dining & Lifestyle Destination
          </motion.span>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white"
              initial={{ y: 120, rotateX: 40 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Boulevard Lounge
            </motion.h1>
          </div>

          <motion.h2
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-light text-white/90 mb-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Bar & Grill
          </motion.h2>

          <motion.p
            className="font-cormorant text-lg md:text-xl lg:text-2xl italic text-white/70 mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            &ldquo;{SITE_CONFIG.tagline}&rdquo;
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <MagneticButton href="/menu" variant="primary">
              Explore Our Menu
            </MagneticButton>
            <MagneticButton href="/reservations" variant="ghost">
              Reserve a Table
            </MagneticButton>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
              ))}
            </div>
            <span className="font-inter text-xs text-white/60">5.0 — Rated on Google</span>
          </motion.div>
        </motion.div>

        {/* Open 24 Hours badge */}
        <motion.div
          className="absolute top-28 right-6 z-20 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-montserrat text-[10px] uppercase tracking-[2px] text-white/80">
            Open 24 Hours
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-montserrat text-[8px] uppercase tracking-[3px] text-white/40">
            Scroll to Explore
          </span>
          <motion.div
            className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== MARQUEE ========== */}
      <Marquee className="bg-brand-brown text-white" />

      {/* ========== WELCOME SECTION ========== */}
      <WelcomeSection />

      {/* ========== OFFERINGS GRID ========== */}
      <OfferingsSection />

      {/* ========== MENU PREVIEW ========== */}
      <MenuPreviewSection />

      {/* ========== AMBIANCE SECTION ========== */}
      <AmbianceSection />

      {/* ========== WHY CHOOSE US ========== */}
      <FeaturesSection />

      {/* ========== TESTIMONIALS ========== */}
      <TestimonialsSection />

      {/* ========== INSTAGRAM FEED ========== */}
      <InstagramSection />

      {/* ========== CTA BANNER ========== */}
      <CTABannerSection />

      {/* ========== MAP SECTION ========== */}
      <MapSection />
    </>
  );
}

/* ===== WELCOME SECTION ===== */
function WelcomeSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-brown/[0.03] rounded-full blur-[150px] animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.span
              className="section-label mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Welcome to Boulevard
            </motion.span>

            <AnimatedText
              text="Where Every Moment Becomes a Memory"
              as="h2"
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-8"
            />

            <motion.p
              className="font-inter text-base text-text-secondary leading-[1.9] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Nestled in the heart of Hai Referendum, Juba, Boulevard Lounge Bar & Grill is your ultimate
              destination for exceptional dining, handcrafted cocktails, a tranquil spa experience, and a
              sparkling pool to unwind by. Whether you&apos;re celebrating with loved ones, hosting an unforgettable
              event, or simply seeking a moment of blissful escape — Boulevard is where it all comes together.
            </motion.p>

            <motion.ul className="space-y-4 mb-10">
              {[
                { icon: "🍽️", text: "Exquisite Dining & Desserts" },
                { icon: "🍸", text: "Premium Lounge & Bar" },
                { icon: "🏊", text: "Refreshing Swimming Pool" },
                { icon: "💆", text: "Relaxing Spa & Wellness" },
                { icon: "🎉", text: "Private Events & Celebrations" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 font-inter text-sm text-text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <motion.span
                    className="text-xl"
                    animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/about"
                className="font-montserrat text-sm uppercase tracking-[2px] font-semibold text-brand-brown link-underline inline-flex items-center gap-2 group"
              >
                Discover More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Images */}
          <div className="relative">
            {/* Background decorative number */}
            <span className="absolute -top-12 -left-8 font-playfair text-[200px] font-bold text-surface-cream/60 select-none z-0">
              01
            </span>

            <motion.div
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <img
                src={PLACEHOLDER_IMAGES.restaurant[0]}
                alt="Boulevard Restaurant Interior"
                className="object-cover w-full h-[500px] lg:h-[600px] img-warm"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-4 md:right-[-30px] z-20 w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-4 border-brand-brown shadow-xl rotate-[-3deg]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img
                src={PLACEHOLDER_IMAGES.cocktails[0]}
                alt="Signature Cocktail"
                className="object-cover w-full h-full img-warm"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== OFFERINGS SECTION ===== */
function OfferingsSection() {
  return (
    <section className="py-24 lg:py-32 bg-surface-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What We Offer"
          title="A World of Indulgence Under One Roof"
          subtitle="From sizzling plates to serene spa treatments, every corner of Boulevard is designed to delight."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, i) => (
            <OfferingCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferingCard({
  icon: Icon,
  title,
  description,
  image,
  link,
  linkText,
  index,
}: (typeof offerings)[0] & { index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover relative"
      initial={{ opacity: 0, y: 50, rotateY: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 img-warm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            className="w-14 h-14 rounded-full bg-brand-brown/80 flex items-center justify-center"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          >
            <Icon size={24} className="text-white" />
          </motion.div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon size={20} className="text-brand-brown" />
          <h3 className="font-playfair text-xl font-bold text-text-primary">{title}</h3>
        </div>
        <p className="font-inter text-sm text-text-secondary leading-relaxed mb-4">
          {description}
        </p>
        <Link
          to={link}
          className="font-montserrat text-xs uppercase tracking-[2px] font-semibold text-brand-brown link-underline inline-flex items-center gap-1 group/link"
        >
          {linkText}
          <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ===== MENU PREVIEW SECTION ===== */
function MenuPreviewSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative watermark */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-playfair text-[180px] font-bold text-surface-cream/50 -rotate-90 origin-left select-none hidden xl:block">
        MENU
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <motion.span
              className="section-label mb-4 block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
            >
              Our Menu
            </motion.span>

            <AnimatedText
              text="Tastes That Tell a Story"
              as="h2"
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6"
            />

            <motion.p
              className="font-inter text-base text-text-secondary leading-[1.9] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Our chefs pour passion into every plate. Explore a menu that blends local South Sudanese
              flavors with international culinary artistry. Whether it&apos;s dinner, dessert, or a quick bite
              — every dish is crafted to perfection.
            </motion.p>

            <MagneticButton href="/menu" variant="primary">
              View Full Menu
            </MagneticButton>
          </div>

          {/* Horizontal scroll food cards */}
          <div className="lg:col-span-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max lg:min-w-0 lg:flex-wrap xl:flex-nowrap">
              {menuPreviewItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="min-w-[260px] max-w-[260px] bg-surface-cream rounded-2xl overflow-hidden shadow-md card-hover flex-shrink-0"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full img-warm"
                    />
                    {/* Glass morphism price tag */}
                    <div className="absolute bottom-3 right-3 glass rounded-lg px-3 py-1">
                      <span className="font-montserrat text-sm font-bold text-white">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-playfair text-lg font-bold text-text-primary mb-1">{item.name}</h4>
                    <p className="font-inter text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== AMBIANCE SECTION ===== */
function AmbianceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const { ref, isInView } = useInView(0.3);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] lg:h-screen overflow-hidden flex items-center justify-center"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={PLACEHOLDER_IMAGES.restaurant[1]}
          alt="Boulevard Ambiance"
          className="object-cover w-full h-full img-warm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,15,5,0.6)] to-[rgba(26,15,5,0.8)]" />
      </motion.div>

      <div ref={ref} className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.span
          className="font-montserrat text-[10px] uppercase tracking-[5px] font-semibold text-brand-gold mb-6 block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          The Experience
        </motion.span>

        <AnimatedText
          text="Feel the Vibe. Live the Moment."
          as="h2"
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
        />

        <motion.div
          className="flex items-center justify-center gap-6 md:gap-10 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {["CASUAL", "COZY", "TRENDY"].map((word, i) => (
            <motion.span
              key={word}
              className="font-montserrat text-lg md:text-xl uppercase tracking-[4px] text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.2 }}
            >
              {word}
              {i < 2 && (
                <span className="ml-6 md:ml-10 text-brand-gold">|</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="font-inter text-base text-white/60 leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          Step inside and feel the energy shift. Whether it&apos;s the soft glow of ambient lighting,
          the smooth jazz in the background, or the aroma of freshly prepared cuisine — Boulevard&apos;s
          atmosphere is designed to make you stay longer and come back sooner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          <MagneticButton href="/reservations" variant="ghost">
            Book Your Experience
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== FEATURES SECTION ===== */
function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-surface-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why Boulevard"
          title="More Than a Restaurant. It's a Lifestyle."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  index,
}: (typeof features)[0] & { index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.3);

  return (
    <motion.div
      ref={ref}
      className="text-center p-8 rounded-2xl bg-white shadow-sm card-hover"
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40,
      }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-5 rounded-full bg-surface-cream flex items-center justify-center"
        animate={isInView ? { scale: [0, 1.2, 1], rotate: [0, 10, 0] } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        <Icon size={28} className="text-brand-brown" />
      </motion.div>
      <h3 className="font-playfair text-xl font-bold text-text-primary mb-3">{title}</h3>
      <p className="font-inter text-sm text-text-secondary leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ===== TESTIMONIALS SECTION ===== */
function TestimonialsSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative quote */}
      <span className="absolute top-20 left-10 font-playfair text-[300px] text-surface-cream/50 select-none leading-none hidden lg:block">
        &ldquo;
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Guest Reviews"
          title="What Our Guests Say"
          subtitle="⭐ 5.0 Rating on Google"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-surface-cream rounded-2xl p-8 border-l-4 border-brand-brown card-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <span className="font-playfair text-5xl text-brand-brown leading-none block mb-4">
                &ldquo;
              </span>
              <p className="font-cormorant text-lg italic text-text-primary leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-brown/10 flex items-center justify-center">
                  <span className="font-playfair text-sm font-bold text-brand-brown">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-montserrat text-sm font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== INSTAGRAM SECTION ===== */
function InstagramSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-surface-dark relative noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Follow the Vibe"
          title="@BoulevardLounge on Instagram"
          subtitle="Join our community and stay updated with the latest happenings."
          light
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramImages.map((img, i) => (
            <motion.div
              key={i}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-view"
              initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <img
                src={img}
                alt="Instagram post"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 img-warm"
              />
              <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/70 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2"
                >
                  <Instagram size={24} className="text-white" />
                  <span className="font-montserrat text-[10px] uppercase tracking-[2px] text-white">
                    View Post
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <MagneticButton href={SITE_CONFIG.social.instagram} variant="ghost">
            Follow Us on Instagram
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== CTA BANNER SECTION ===== */
function CTABannerSection() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&q=80"
        alt="Table setting"
        className="object-cover w-full h-full absolute inset-0 img-warm"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,15,5,0.8)] to-[rgba(26,15,5,0.6)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <AnimatedText
          text="Ready for an Unforgettable Experience?"
          as="h2"
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
        />

        <motion.p
          className="font-inter text-base text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          Reserve your table, plan your event, or simply walk in — we&apos;re open 24 hours.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <MagneticButton href="/reservations" variant="primary">
            Make a Reservation
          </MagneticButton>
          <MagneticButton href={`tel:${SITE_CONFIG.phone}`} variant="ghost">
            <Phone size={16} className="mr-2" />
            Call Us Now
          </MagneticButton>
        </motion.div>

        <motion.p
          className="font-montserrat text-xl md:text-2xl text-white font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {SITE_CONFIG.phone}
        </motion.p>
      </div>
    </section>
  );
}

/* ===== MAP SECTION ===== */
function MapSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 bg-surface-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Map */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-auto"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.815!2d31.58!3d4.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTEnMDAuMCJOIDMxwrAzNCc0OC4wIkU!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boulevard Lounge Location"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Find Us
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-brand-brown mt-1 flex-shrink-0" />
                <div>
                  <p className="font-montserrat text-sm font-semibold text-text-primary mb-1">Address</p>
                  <p className="font-inter text-sm text-text-secondary">{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-brand-brown mt-1 flex-shrink-0" />
                <div>
                  <p className="font-montserrat text-sm font-semibold text-text-primary mb-1">Phone</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="font-inter text-sm text-text-secondary hover:text-brand-brown transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-brand-brown mt-1 flex-shrink-0" />
                <div>
                  <p className="font-montserrat text-sm font-semibold text-text-primary mb-1">Hours</p>
                  <p className="font-inter text-sm text-text-secondary flex items-center gap-2">
                    {SITE_CONFIG.hours}
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>

            <MagneticButton
              href="https://maps.google.com"
              variant="outline"
            >
              Get Directions
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

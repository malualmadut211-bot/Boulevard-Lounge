import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <HeroSection
        label="About Us"
        title="The Heart Behind Boulevard"
        subtitle="More than a restaurant. More than a lounge. We're a family."
        backgroundClass="placeholder-hero-about"
      />

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <StoryImage />
            <StoryText />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ValuesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Timeline Section */}
      <TimelineSection />
    </>
  );
}

function StoryImage() {
  const { ref, isInView } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden shadow-2xl h-[550px]"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={PLACEHOLDER_IMAGES.restaurant[2]}
        alt="Boulevard Restaurant Interior"
        className="object-cover w-full h-full img-warm"
      />
    </motion.div>
  );
}

function StoryText() {
  const { ref, isInView } = useInView(0.2);
  return (
    <div ref={ref}>
      <motion.span className="section-label mb-4 block" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
        Our Story
      </motion.span>
      <motion.h2
        className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        From a Vision to a Vibrant Destination
      </motion.h2>
      <motion.div
        className="font-inter text-base text-text-secondary leading-[1.9] space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <p>Boulevard Lounge Bar & Grill was born from a simple yet powerful vision — to create a space in the heart of Juba where people could come together to enjoy exceptional food, refreshing drinks, and unforgettable experiences.</p>
        <p>From our humble beginnings, we've grown into Juba's premier dining and lifestyle destination, proudly serving our community and visitors from around the world.</p>
        <p>Every detail at Boulevard — from our carefully crafted menu to our serene spa, from our sparkling pool to our vibrant lounge — is designed with one goal in mind: to make every guest feel special.</p>
        <p>We're not just a restaurant. We're not just a bar. We're a home away from home.</p>
      </motion.div>
      <motion.div
        className="mt-12 pt-8 border-t border-border-light flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <img src={PLACEHOLDER_IMAGES.team[3]} alt="Founder" className="w-16 h-16 rounded-full object-cover border-2 border-brand-brown" />
        <div>
          <h4 className="font-playfair text-lg font-bold text-text-primary">James Akol</h4>
          <span className="font-montserrat text-xs text-text-secondary">Founder & Visionary</span>
        </div>
      </motion.div>
    </div>
  );
}

function ValuesSection() {
  const { ref, isInView } = useInView(0.2);
  const values = [
    { num: "01", title: "Quality", desc: "We never compromise on the quality of our food, drinks, service, or experience. Every dish, every drink, every moment is crafted with excellence in mind." },
    { num: "02", title: "Hospitality", desc: "Every guest is family. We go above and beyond to make you feel welcome, comfortable, and cherished from the moment you walk through our doors." },
    { num: "03", title: "Community", desc: "We're proud to be part of Juba's vibrant community and contribute to its growth. Boulevard is more than a venue — it's a gathering place for all." },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="Our Values" title="What We Stand For" subtitle="The principles that guide everything we do at Boulevard." />
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm relative overflow-hidden card-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <span className="absolute -top-4 right-4 font-playfair text-8xl font-bold text-brand-brown opacity-5">{val.num}</span>
              <h3 className="font-playfair text-2xl font-bold text-text-primary mb-4">{val.title}</h3>
              <p className="font-inter text-sm text-text-secondary leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { ref, isInView } = useInView(0.2);
  const team = [
    { name: "David Lual", role: "General Manager", image: PLACEHOLDER_IMAGES.team[0] },
    { name: "Chef Amara Deng", role: "Head Chef", image: PLACEHOLDER_IMAGES.team[1] },
    { name: "Grace Ayen", role: "Spa Director", image: PLACEHOLDER_IMAGES.team[2] },
    { name: "Michael Bol", role: "Events Coordinator", image: PLACEHOLDER_IMAGES.team[3] },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our People" title="Meet the Boulevard Family" subtitle="The passionate individuals who bring Boulevard to life every single day." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-surface-cream card-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative h-72 overflow-hidden">
                <img src={member.image} alt={member.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-playfair text-xl font-bold text-text-primary">{member.name}</h3>
                <span className="font-montserrat text-xs uppercase tracking-[2px] text-brand-brown">{member.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const { ref, isInView } = useInView(0.2);
  const milestones = [
    { year: "January 2019", title: "Grand Opening", desc: "Boulevard Lounge Bar & Grill opens its doors for the first time, welcoming Juba's community to a new era of dining and entertainment." },
    { year: "June 2019", title: "First Major Event", desc: "We hosted our first sold-out event — a live music & dining night that set the standard for all celebrations to follow." },
    { year: "March 2020", title: "Spa & Pool Addition", desc: "Expanding our vision, we unveiled the Boulevard Spa and Pool — transforming our venue into a complete lifestyle destination." },
    { year: "December 2021", title: "1,000th Guest Celebrated", desc: "We celebrated our 1,000th unique guest with a special surprise dinner, marking a milestone in our growing community." },
    { year: "August 2022", title: "5-Star Excellence Award", desc: "Boulevard received its first 5-star rating from the South Sudan Hospitality Board, recognizing our commitment to exceptional quality." },
    { year: "May 2024", title: "Community Impact Award", desc: "Honored with Juba's Community Impact Award for our contributions to local employment, culture, and social gatherings." },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Journey" title="Milestones Along the Way" subtitle="A look at the key moments that shaped Boulevard into what it is today." />
        <div className="relative border-l-2 border-brand-brown/20 ml-4 md:ml-1/2">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="mb-12 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <div className="absolute w-4 h-4 bg-brand-brown rounded-full -left-[9px] top-1 border-4 border-surface-cream" />
              <span className="font-montserrat text-xs uppercase tracking-[2px] text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">{m.year}</span>
              <h3 className="font-playfair text-xl font-bold text-text-primary mt-3 mb-2">{m.title}</h3>
              <p className="font-inter text-sm text-text-secondary">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import React, { useState } from "react";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Check, Send } from "lucide-react";

const eventTypes = [
  { title: "Private Dining", desc: "Host an exclusive dinner for your closest circle. Personalized menu, dedicated service, unforgettable ambiance.", image: PLACEHOLDER_IMAGES.events[0] },
  { title: "Corporate Events", desc: "Impress your clients and colleagues. We offer full event planning support for corporate functions and meetings.", image: PLACEHOLDER_IMAGES.events[1] },
  { title: "Celebrations & Parties", desc: "Birthdays, anniversaries, engagements — whatever the occasion, we'll make it spectacular.", image: PLACEHOLDER_IMAGES.events[2] },
  { title: "Weddings & Receptions", desc: "Say 'I do' in style. Our venue offers a breathtaking backdrop for weddings and receptions.", image: PLACEHOLDER_IMAGES.events[0] },
  { title: "Poolside Events", desc: "Take the party to the pool! Perfect for summer parties, launches, and casual get-togethers.", image: PLACEHOLDER_IMAGES.pool[0] },
];

const provisions = [
  "Customized Event Planning",
  "Full Catering & Bar Service",
  "Décor & Setup",
  "Sound System & Entertainment",
  "Dedicated Event Coordinator",
  "Indoor & Outdoor Spaces",
  "Free Parking for Guests",
  "Wheelchair Accessible",
];

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", eventType: "", guests: "", date: "", requests: "",
  });

  return (
    <>
      <HeroSection
        label="Events & Celebrations"
        title="Make Every Occasion Extraordinary"
        subtitle="From intimate gatherings to grand celebrations, Boulevard is the perfect venue to create memories that last a lifetime."
        backgroundClass="placeholder-hero-events"
        ctaText="Plan Your Event"
        ctaHref="#event-form"
      />

      {/* Event Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Event Types"
            title="Every Occasion Deserves the Best"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, i) => (
              <EventCard key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <ProvisionsSection />

      {/* Event Inquiry Form */}
      <section id="event-form" className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Plan Your Event"
            title="Tell Us About Your Event"
            subtitle="Fill out the form below and our events team will get back to you within 24 hours."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            <EventForm formData={formData} setFormData={setFormData} />
            <div className="relative rounded-2xl overflow-hidden shadow-lg hidden lg:block">
              <img
                src={PLACEHOLDER_IMAGES.events[1]}
                alt="Past event at Boulevard"
                className="object-cover w-full h-full img-warm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <p className="font-cormorant text-xl italic text-white mb-2">
                    &ldquo;Boulevard made our wedding reception absolutely magical. The team was incredible!&rdquo;
                  </p>
                  <p className="font-montserrat text-sm text-white/70">— Daniel & Grace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, index }: { event: (typeof eventTypes)[0]; index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden shadow-lg h-[380px] card-hover"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <img
        src={event.image}
        alt={event.title}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 img-warm"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="font-playfair text-2xl font-bold text-white mb-3">{event.title}</h3>
        <p className="font-inter text-sm text-white/70 leading-relaxed">{event.desc}</p>
      </div>
    </motion.div>
  );
}

function ProvisionsSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 bg-surface-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What We Provide"
          title="Everything You Need for a Perfect Event"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {provisions.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-brand-brown/10 flex items-center justify-center flex-shrink-0"
                animate={isInView ? { scale: [0, 1] } : {}}
                transition={{ delay: i * 0.08 + 0.3 }}
              >
                <Check size={16} className="text-brand-brown" />
              </motion.div>
              <span className="font-inter text-sm text-text-primary font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <motion.div
        className="bg-white p-12 rounded-2xl shadow-md text-center flex flex-col items-center justify-center h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mb-6">
          <Check size={32} className="text-brand-brown" />
        </div>
        <h3 className="font-playfair text-3xl font-bold text-text-primary mb-4">Inquiry Received</h3>
        <p className="font-inter text-text-secondary leading-relaxed">
          Thank you for considering Boulevard for your event. Our events team will review your inquiry and get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-8 shadow-md">
      {[
        { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
        { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "+211 ..." },
      ].map((field) => (
        <div key={field.name}>
          <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-brown transition-colors duration-300"
          />
        </div>
      ))}

      <div>
        <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">
          Event Type
        </label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm text-text-primary focus:outline-none focus:border-brand-brown transition-colors"
        >
          <option value="">Select event type</option>
          {eventTypes.map((e) => (
            <option key={e.title} value={e.title}>{e.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">
            Estimated Guests
          </label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Number of guests"
            className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors"
          />
        </div>
        <div>
          <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">
          Special Requests
        </label>
        <textarea
          name="requests"
          value={formData.requests}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your vision..."
          className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm resize-none focus:outline-none focus:border-brand-brown transition-colors"
        />
      </div>

      <MagneticButton type="submit" variant="primary" className="w-full justify-center">
        <Send size={16} className="mr-2" />
        Submit Inquiry
      </MagneticButton>
    </form>
  );
}

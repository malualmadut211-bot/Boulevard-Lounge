import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <HeroSection
        label="Contact Us"
        title="We'd Love to Hear From You"
        subtitle="Whether you have a question, want to make a reservation, or just want to say hello — reach out!"
        backgroundClass="placeholder-hero-contact"
      />

      {/* Contact Info Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard icon={MapPin} title="Visit Us" desc={SITE_CONFIG.address} link="https://maps.google.com" linkText="Get Directions" delay={0.1} />
            <InfoCard icon={Phone} title="Call Us" desc={SITE_CONFIG.phone} link={`tel:${SITE_CONFIG.phone}`} linkText="Call Now" delay={0.2} />
            <InfoCard icon={Mail} title="Email Us" desc={SITE_CONFIG.email} link={`mailto:${SITE_CONFIG.email}`} linkText="Send Email" delay={0.3} />
            <InfoCard icon={Clock} title="Hours" desc={SITE_CONFIG.hours} link="#" linkText="We're always here" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <MapEmbed />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}

function InfoCard({ icon: Icon, title, desc, link, linkText, delay }: any) {
  const { ref, isInView } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="bg-surface-cream p-8 rounded-2xl text-center card-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <div className="w-14 h-14 mx-auto bg-brand-brown/10 rounded-full flex items-center justify-center mb-4">
        <Icon size={24} className="text-brand-brown" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="font-inter text-sm text-text-secondary mb-4 h-10">{desc}</p>
      <a href={link} className="font-montserrat text-xs uppercase tracking-[2px] font-semibold text-brand-brown link-underline">
        {linkText}
      </a>
    </motion.div>
  );
}

function ContactForm() {
  const { ref, isInView } = useInView(0.2);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 md:p-10 rounded-2xl shadow-md"
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h3 className="font-playfair text-3xl font-bold text-text-primary mb-4">Message Sent!</h3>
          <p className="font-inter text-text-secondary">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <>
          <h2 className="font-playfair text-3xl font-bold text-text-primary mb-2">Send Us a Message</h2>
          <p className="font-inter text-sm text-text-secondary mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Full Name *</label>
                <input type="text" required className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors" />
              </div>
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Email Address *</label>
                <input type="email" required className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Phone Number</label>
                <input type="tel" className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors" />
              </div>
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Subject *</label>
                <select required className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="reservation">Reservation</option>
                  <option value="event">Event Inquiry</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Message *</label>
              <textarea required rows={4} className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm resize-none focus:outline-none focus:border-brand-brown transition-colors"></textarea>
            </div>
            <MagneticButton type="submit" variant="primary" className="w-full justify-center">
              <Send size={16} className="mr-2" />
              Send Message
            </MagneticButton>
          </form>
        </>
      )}
    </motion.div>
  );
}

function MapEmbed() {
  const { ref, isInView } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="rounded-2xl overflow-hidden shadow-md h-[400px] lg:h-auto relative"
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <iframe
        src="https://maps.google.com/maps?q=4.89520199697206,31.566738590332285&hl=en&z=15&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Boulevard Lounge Location"
      />
      <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden sm:block">
        <h4 className="font-playfair text-lg font-bold text-text-primary mb-1">Boulevard Lounge</h4>
        <p className="font-inter text-sm text-text-secondary mb-3">{SITE_CONFIG.address}</p>
        <a href="https://maps.google.com" className="font-montserrat text-xs uppercase tracking-[2px] font-semibold text-brand-brown link-underline">Open in Maps</a>
      </div>
    </motion.div>
  );
}

function FAQSection() {
  const { ref, isInView } = useInView(0.2);
  const faqs = [
    { q: "Do you accept reservations?", a: "Yes! You can reserve a table by calling us, using the reservation form on our website, or contacting us via email. Walk-ins are also welcome." },
    { q: "Is there parking available?", a: "Yes, we offer a complimentary private parking lot for our guests, as well as free street parking directly outside the venue." },
    { q: "Is the venue wheelchair accessible?", a: "Absolutely. Boulevard features wheelchair-accessible entrances, parking, and restrooms." },
    { q: "Can I host a private event at Boulevard?", a: "Yes! We cater to private events, corporate functions, weddings, and celebrations of all kinds." },
    { q: "What are your operating hours?", a: "We're open 24 hours a day, 7 days a week." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="FAQ" title="Frequently Asked Questions" subtitle="Quick answers to common questions about Boulevard." />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-border-light pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
              >
                <span className={`font-playfair text-xl font-bold transition-colors ${openIndex === i ? 'text-brand-brown' : 'text-text-primary'}`}>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-brand-brown text-white' : 'bg-surface-cream text-brand-brown'}`}>
                  {openIndex === i ? '−' : '+'}
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="font-inter text-sm text-text-secondary pb-4 pr-12">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Check icon component for success state
function Check(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

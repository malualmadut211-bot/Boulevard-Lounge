import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { Calendar, Clock, Users, Check } from "lucide-react";

export default function ReservationsPage() {
  return (
    <>
      <HeroSection
        label="Reservations"
        title="Book Your Experience"
        subtitle="Reserve your table at Boulevard Restaurant or secure your spot in the Lounge."
        backgroundClass="placeholder-hero-reservations"
      />

      <section className="py-24 bg-surface-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}

function ReservationForm() {
  const { ref, isInView } = useInView(0.2);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    area: "restaurant",
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="bg-white p-12 rounded-2xl shadow-xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8">
          <Check size={48} className="text-green-600" />
        </div>
        <h2 className="font-playfair text-4xl font-bold text-text-primary mb-4">Reservation Confirmed</h2>
        <p className="font-inter text-text-secondary mb-8 max-w-md mx-auto">
          Thank you, {formData.name}. Your reservation for {formData.guests} guests on {formData.date} at {formData.time} in the {formData.area === 'restaurant' ? 'Restaurant' : 'Lounge'} has been received. We've sent a confirmation email to {formData.email}.
        </p>
        <MagneticButton variant="primary" onClick={() => { setSubmitted(false); setStep(1); }}>
          Make Another Booking
        </MagneticButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-surface-cream">
        <motion.div 
          className="h-full bg-brand-brown"
          initial={{ width: "50%" }}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="mb-10 text-center">
        <span className="font-montserrat text-xs uppercase tracking-[2px] font-semibold text-brand-brown mb-2 block">
          Step {step} of 2
        </span>
        <h2 className="font-playfair text-3xl font-bold text-text-primary">
          {step === 1 ? "Reservation Details" : "Your Information"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Area Selection */}
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-4">Select Area</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, area: "restaurant" })}
                  className={`py-4 px-6 rounded-xl border-2 transition-all ${
                    formData.area === "restaurant"
                      ? "border-brand-brown bg-brand-brown/5 text-brand-brown"
                      : "border-border-light text-text-secondary hover:border-brand-brown/30"
                  }`}
                >
                  <span className="font-playfair text-xl font-bold block mb-1">Restaurant</span>
                  <span className="font-inter text-xs">Fine Dining Experience</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, area: "lounge" })}
                  className={`py-4 px-6 rounded-xl border-2 transition-all ${
                    formData.area === "lounge"
                      ? "border-brand-brown bg-brand-brown/5 text-brand-brown"
                      : "border-border-light text-text-secondary hover:border-brand-brown/30"
                  }`}
                >
                  <span className="font-playfair text-xl font-bold block mb-1">Lounge & Bar</span>
                  <span className="font-inter text-xs">Drinks & Vibrant Vibe</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Date */}
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-brown" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-8 pr-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors custom-date-picker"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Time</label>
                <div className="relative">
                  <Clock size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-brown" />
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-8 pr-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors appearance-none"
                  >
                    <option value="">Select Time</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Guests</label>
                <div className="relative">
                  <Users size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-brown" />
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-8 pr-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <MagneticButton
                variant="primary"
                type="button"
                onClick={() => {
                  if (formData.date && formData.time && formData.guests) handleNext();
                  else alert("Please fill in all details.");
                }}
              >
                Continue
              </MagneticButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors"
                />
              </div>
              <div>
                <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm focus:outline-none focus:border-brand-brown transition-colors"
              />
            </div>
            <div>
              <label className="block font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-primary mb-2">Special Requests (Optional)</label>
              <textarea
                rows={3}
                value={formData.requests}
                onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                placeholder="Dietary requirements, special occasions..."
                className="w-full px-0 py-3 bg-transparent border-b-2 border-border-light font-inter text-sm resize-none focus:outline-none focus:border-brand-brown transition-colors"
              ></textarea>
            </div>

            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                className="font-montserrat text-xs uppercase tracking-[2px] font-semibold text-text-secondary hover:text-brand-brown transition-colors"
              >
                Back
              </button>
              <MagneticButton variant="primary" type="submit">
                Confirm Reservation
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

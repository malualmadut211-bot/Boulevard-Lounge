import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { useInView } from "@/hooks/useInView";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryCategories = ["All", "Restaurant", "Lounge & Bar", "Spa", "Pool", "Events", "Food & Drinks"];

const galleryImages = [
  ...PLACEHOLDER_IMAGES.restaurant.map((img) => ({ src: img, category: "Restaurant" })),
  ...PLACEHOLDER_IMAGES.food.slice(0, 4).map((img) => ({ src: img, category: "Food & Drinks" })),
  ...PLACEHOLDER_IMAGES.cocktails.slice(0, 3).map((img) => ({ src: img, category: "Lounge & Bar" })),
  ...PLACEHOLDER_IMAGES.lounge.map((img) => ({ src: img, category: "Lounge & Bar" })),
  ...PLACEHOLDER_IMAGES.spa.map((img) => ({ src: img, category: "Spa" })),
  ...PLACEHOLDER_IMAGES.pool.map((img) => ({ src: img, category: "Pool" })),
  ...PLACEHOLDER_IMAGES.events.map((img) => ({ src: img, category: "Events" })),
  ...PLACEHOLDER_IMAGES.desserts.map((img) => ({ src: img, category: "Food & Drinks" })),
  ...PLACEHOLDER_IMAGES.food.slice(4).map((img) => ({ src: img, category: "Food & Drinks" })),
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView(0.05);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));

  return (
    <>
      <HeroSection
        label="Gallery"
        title="A Glimpse Into Boulevard"
        subtitle="Experience our world through the lens. Every image tells a story of great food, beautiful spaces, and unforgettable moments."
        backgroundClass="placeholder-hero-gallery"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-montserrat text-[11px] uppercase tracking-[2px] font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-brown text-white"
                    : "bg-surface-cream text-text-secondary hover:bg-brand-brown/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div ref={ref} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.src + img.category}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative rounded-xl overflow-hidden cursor-view break-inside-avoid"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={`Gallery - ${img.category}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 img-warm"
                  />
                  <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/50 transition-all duration-500 flex items-center justify-center">
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={28} className="text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-montserrat text-[9px] uppercase tracking-[2px] text-white bg-black/40 px-2 py-1 rounded">
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="relative max-w-4xl max-h-[80vh] mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt="Gallery image"
                className="max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-4 py-2">
                <span className="font-montserrat text-xs text-white">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

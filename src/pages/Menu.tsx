import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/ui/HeroSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useInView } from "@/hooks/useInView";
import { Star, X, Download } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

const categories = ["All", "Starters", "Main Course", "Grills", "Small Plates", "Desserts", "Beverages", "Cocktails"];

const menuItems = [
  { name: "Bruschetta Trio", desc: "Tomato basil, mushroom & olive tapenade", price: "$12", category: "Starters", image: PLACEHOLDER_IMAGES.food[0], chefPick: false },
  { name: "Spiced Lamb Soup", desc: "Slow-cooked with African spices", price: "$14", category: "Starters", image: PLACEHOLDER_IMAGES.food[1], chefPick: false },
  { name: "Grilled Lamb Chops", desc: "Herb-crusted with seasonal vegetables", price: "$28", category: "Main Course", image: PLACEHOLDER_IMAGES.food[2], chefPick: true },
  { name: "Pan-Seared Tilapia", desc: "Lake catch with lemon butter sauce", price: "$24", category: "Main Course", image: PLACEHOLDER_IMAGES.food[3], chefPick: false },
  { name: "Signature Ribeye Steak", desc: "Prime cut with truffle mashed potatoes", price: "$42", category: "Grills", image: PLACEHOLDER_IMAGES.food[4], chefPick: true },
  { name: "Mixed Grill Platter", desc: "Selection of premium grilled meats", price: "$38", category: "Grills", image: PLACEHOLDER_IMAGES.food[5], chefPick: false },
  { name: "Spiced Chicken Wings", desc: "Crispy with honey-chili glaze", price: "$16", category: "Small Plates", image: PLACEHOLDER_IMAGES.food[6], chefPick: false },
  { name: "Cheese & Charcuterie Board", desc: "Artisanal selection with crackers", price: "$22", category: "Small Plates", image: PLACEHOLDER_IMAGES.food[7], chefPick: false },
  { name: "Chocolate Fondant", desc: "Molten center with vanilla ice cream", price: "$14", category: "Desserts", image: PLACEHOLDER_IMAGES.desserts[0], chefPick: true },
  { name: "Tropical Fruit Tart", desc: "Mango, passion fruit & coconut cream", price: "$12", category: "Desserts", image: PLACEHOLDER_IMAGES.desserts[1], chefPick: false },
  { name: "Mango Sunrise", desc: "Fresh mango, lime & sparkling water", price: "$8", category: "Beverages", image: PLACEHOLDER_IMAGES.cocktails[0], chefPick: false },
  { name: "Boulevard Sunset", desc: "Signature cocktail with rum & passion fruit", price: "$15", category: "Cocktails", image: PLACEHOLDER_IMAGES.cocktails[1], chefPick: false },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<(typeof menuItems)[0] | null>(null);

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const chefPicks = menuItems.filter((item) => item.chefPick);

  return (
    <>
      <HeroSection
        label="Our Menu"
        title="Crafted With Passion. Served With Love."
        subtitle="Explore our carefully curated selection of dishes, drinks, and desserts — each one a celebration of flavor."
        backgroundClass="placeholder-hero-menu"
      />

      {/* Category Tabs */}
      <div className="sticky top-[72px] z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-montserrat text-[11px] uppercase tracking-[2px] font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-brown text-white"
                    : "bg-surface-cream text-text-secondary hover:bg-brand-brown/10 hover:text-brand-brown"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-surface-cream rounded-2xl overflow-hidden shadow-md card-hover cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 img-warm"
                    />
                    {item.chefPick && (
                      <div className="absolute top-3 left-3 bg-brand-gold text-white font-montserrat text-[9px] uppercase tracking-[2px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} className="fill-white" />
                        Chef&apos;s Pick
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="font-montserrat text-base font-bold text-brand-brown">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="font-montserrat text-[9px] uppercase tracking-[2px] text-brand-copper mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-text-primary mb-1">{item.name}</h3>
                    <p className="font-inter text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-20 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Chef's Recommendations"
            title="Hand-Picked by Our Head Chef"
            subtitle="These signature dishes represent the very best of Boulevard's culinary artistry."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {chefPicks.map((item, i) => (
              <ChefPickCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Download PDF CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-playfair text-2xl font-bold text-text-primary mb-4">
            Want the full menu?
          </h3>
          <p className="font-inter text-sm text-text-secondary mb-8">
            Download our complete menu with all dishes, dietary information, and pricing.
          </p>
          <MagneticButton variant="primary">
            <Download size={16} className="mr-2" />
            Download Full Menu (PDF)
          </MagneticButton>
        </div>
      </section>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="object-cover w-full h-full img-warm"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <span className="font-montserrat text-[10px] uppercase tracking-[2px] text-brand-copper">
                  {selectedItem.category}
                </span>
                <h3 className="font-playfair text-2xl font-bold text-text-primary mt-1 mb-2">
                  {selectedItem.name}
                </h3>
                <p className="font-inter text-sm text-text-secondary mb-4">
                  {selectedItem.desc}
                </p>
                <p className="font-montserrat text-2xl font-bold text-brand-brown mb-6">
                  {selectedItem.price}
                </p>
                <MagneticButton href="/reservations" variant="primary" className="w-full justify-center">
                  Reserve & Order
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChefPickCard({ item, index }: { item: (typeof menuItems)[0]; index: number; key?: React.Key }) {
  const { ref, isInView } = useInView(0.3);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative h-[400px] cursor-pointer [perspective:1000px]"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-lg">
          <img src={item.image} alt={item.name} className="object-cover w-full h-full img-warm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-brand-gold text-white font-montserrat text-[9px] uppercase tracking-[2px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={10} className="fill-white" />
            Chef&apos;s Pick
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-playfair text-xl font-bold text-white mb-1">{item.name}</h3>
            <p className="font-inter text-xs text-white/70">{item.desc}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-brand-brown p-8 flex flex-col justify-center items-center text-center shadow-lg">
          <h3 className="font-playfair text-2xl font-bold text-white mb-4">{item.name}</h3>
          <p className="font-inter text-sm text-white/80 mb-6">{item.desc}</p>
          <p className="font-montserrat text-3xl font-bold text-brand-gold mb-6">{item.price}</p>
          <MagneticButton href="/reservations" variant="ghost">
            Reserve & Order
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

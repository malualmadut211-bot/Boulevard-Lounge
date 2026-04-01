import { cn } from "@/lib/utils";

interface MarqueeProps {
  items?: string[];
  className?: string;
  reverse?: boolean;
}

const defaultItems = [
  "RESTAURANT",
  "LOUNGE",
  "BAR & GRILL",
  "SWIMMING POOL",
  "SPA",
  "EVENTS",
  "FINE DINING",
  "COCKTAILS",
  "UNFORGETTABLE VIBES",
];

export function Marquee({
  items = defaultItems,
  className,
  reverse = false,
}: MarqueeProps) {
  const content = items.join(" ✦ ") + " ✦ ";

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap py-5",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        <span className="font-montserrat text-sm uppercase tracking-[3px] font-semibold px-4">
          {content}
        </span>
        <span className="font-montserrat text-sm uppercase tracking-[3px] font-semibold px-4">
          {content}
        </span>
        <span className="font-montserrat text-sm uppercase tracking-[3px] font-semibold px-4">
          {content}
        </span>
        <span className="font-montserrat text-sm uppercase tracking-[3px] font-semibold px-4">
          {content}
        </span>
      </div>
    </div>
  );
}

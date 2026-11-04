import { Headset, RotateCcw, ShieldHalf, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "../Reveal/Reveal";

// Each card carries its own colour set (full class names so Tailwind sees them)
const cards = [
  {
    Icon: Truck,
    title: "Free Shipping",
    text: "On orders over 500 EGP",
    icon: "bg-blue-50 text-blue-500 group-hover:bg-blue-500",
    bar: "bg-blue-500",
    glow: "group-hover:shadow-blue-500/15",
  },
  {
    Icon: ShieldHalf,
    title: "Secure Payment",
    text: "100% secure transactions",
    icon: "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500",
    bar: "bg-emerald-500",
    glow: "group-hover:shadow-emerald-500/15",
  },
  {
    Icon: RotateCcw,
    title: "Easy Returns",
    text: "14-day return policy",
    icon: "bg-orange-50 text-orange-500 group-hover:bg-orange-500",
    bar: "bg-orange-500",
    glow: "group-hover:shadow-orange-500/15",
  },
  {
    Icon: Headset,
    title: "24/7 Support",
    text: "Dedicated support team",
    icon: "bg-purple-50 text-purple-500 group-hover:bg-purple-500",
    bar: "bg-purple-500",
    glow: "group-hover:shadow-purple-500/15",
  },
];

const PromoCards = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, text, icon, bar, glow }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div
                className={cn(
                  "group relative flex items-center gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  glow,
                )}
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-[-8deg] group-hover:text-white",
                    icon,
                  )}
                >
                  <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                  <p className="text-xs text-gray-500">{text}</p>
                </div>
                {/* Colour bar that slides in along the bottom edge on hover */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full",
                    bar,
                  )}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCards;

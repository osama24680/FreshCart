import Link from "next/link";
import { Apple, ArrowRight, Carrot, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "../Reveal/Reveal";
import CopyCode from "./CopyCode";

const deals = [
  {
    badge: "Deal of the Day",
    BadgeIcon: Flame,
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected organic fruits",
    discount: "40%",
    code: "ORGANIC40",
    cta: { label: "Shop Now", href: "/products" },
    Watermark: Apple,
    bg: "from-emerald-600 via-emerald-700 to-emerald-800",
    btn: "text-emerald-700",
    from: "left" as const,
  },
  {
    badge: "New Arrivals",
    BadgeIcon: Sparkles,
    title: "Exotic Vegetables",
    text: "Discover our latest collection of premium vegetables",
    discount: "25%",
    code: "FRESH25",
    cta: { label: "Explore Now", href: "/products?sort=newest" },
    Watermark: Carrot,
    bg: "from-orange-600 via-orange-600 to-rose-700",
    btn: "text-orange-700",
    from: "right" as const,
  },
];

const DealBanners = () => {
  return (
    // overflow-x-clip: banners start off to the side, which must not widen the page
    <section className="overflow-x-clip py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {deals.map((deal) => (
            <Reveal key={deal.title} from={deal.from}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl bg-linear-to-br p-8 text-white shadow-lg transition-shadow duration-500 hover:shadow-2xl",
                  deal.bg,
                )}
              >
                {/* Decorative bubbles — they drift apart on hover */}
                <span className="absolute top-0 right-0 size-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 transition-transform duration-700 group-hover:translate-x-1/3 group-hover:-translate-y-1/3 group-hover:scale-125" />
                <span className="absolute bottom-0 left-0 size-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 transition-transform duration-700 group-hover:-translate-x-1/3 group-hover:translate-y-1/3 group-hover:scale-125" />

                {/* Big faded icon in the corner that tilts on hover */}
                <deal.Watermark
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="absolute -right-4 -bottom-6 size-44 text-white/15 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
                />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                    <deal.BadgeIcon className="size-4 motion-safe:animate-pulse" />
                    <span>{deal.badge}</span>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold md:text-3xl">{deal.title}</h3>
                  <p className="mb-5 text-white/95">{deal.text}</p>

                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="text-4xl leading-none font-black tracking-tight">
                      {deal.discount}
                      <span className="ml-1 text-lg font-bold">OFF</span>
                    </div>
                    <CopyCode code={deal.code} />
                  </div>

                  <Link
                    href={deal.cta.href}
                    className={cn(
                      "group/btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold shadow-md transition-all duration-300 hover:gap-3 hover:shadow-lg",
                      deal.btn,
                    )}
                  >
                    {deal.cta.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealBanners;

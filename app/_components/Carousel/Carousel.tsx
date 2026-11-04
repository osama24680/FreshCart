"use client";
import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    accent: "text-green-500",
    primary: { label: "Shop Now", href: "/products" },
    secondary: { label: "View Deals", href: "/deals" },
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    accent: "text-blue-500",
    primary: { label: "Shop Now", href: "/products" },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    accent: "text-purple-500",
    primary: { label: "Order Now", href: "/products" },
    secondary: { label: "Delivery Info", href: "/delivery" },
  },
];

const arrowClass =
  "z-10 hidden size-12 rounded-full border-0 bg-white/90 text-green-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-green-600 md:flex [&_svg:not([class*='size-'])]:size-4.5";

const reveal = (active: boolean, delay: string) =>
  cn(
    "transition-all duration-500",
    delay,
    active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
  );

const SLIDE_MS = 6000;

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      className="relative"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => {
            const active = i === current;
            return (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative flex h-100 items-center justify-center overflow-hidden">
                  {/* Slow "Ken Burns" zoom on the active slide's photo */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-[url(/images/home-slider-1.png)] bg-cover bg-center motion-safe:transition-transform motion-safe:duration-[7000ms] motion-safe:ease-out",
                      active ? "scale-110" : "scale-100",
                    )}
                  />
                  <div className="relative h-full w-full bg-linear-to-r from-green-500/90 to-green-400/50 p-4 py-20 text-white">
                    <div className="container mx-auto h-full content-center px-8">
                      <h2
                        className={cn(
                          "mb-4 max-w-96 text-3xl font-bold text-white",
                          reveal(active, "delay-100"),
                        )}
                      >
                        {slide.title}
                      </h2>
                      <p className={reveal(active, "delay-200")}>
                        {slide.text}
                      </p>
                      <div className={cn("mt-4", reveal(active, "delay-300"))}>
                        <Link
                          href={slide.primary.href}
                          className={cn(
                            "inline-block rounded-lg border-2 border-white/50 bg-white px-6 py-2 font-semibold transition-transform hover:scale-105",
                            slide.accent,
                          )}
                        >
                          {slide.primary.label}
                        </Link>
                        <Link
                          href={slide.secondary.href}
                          className="ml-2 inline-block rounded-lg border-2 border-white/50 bg-transparent px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
                        >
                          {slide.secondary.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className={cn("left-4", arrowClass)} />
        <CarouselNext className={cn("right-4", arrowClass)} />

        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "relative mx-1 h-3 overflow-hidden rounded-full transition-all duration-300",
                i === current
                  ? "w-8 bg-white/50"
                  : "w-3 bg-white/50 hover:bg-white/75",
              )}
            >
              {/* Autoplay: the active dot fills up like a timer, and when the
                  fill finishes we go to the next slide. Pausing the animation
                  (hover / focus) therefore also pauses the autoplay.
                  key={current} restarts the fill on every slide change. */}
              {i === current && (
                <span
                  key={current}
                  onAnimationEnd={() => api?.scrollNext()}
                  style={{ "--slide-duration": `${SLIDE_MS}ms` } as CSSProperties}
                  className={cn(
                    "absolute inset-0 origin-left rounded-full bg-white motion-safe:animate-progress",
                    paused && "[animation-play-state:paused]",
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </Carousel>
    </section>
  );
}

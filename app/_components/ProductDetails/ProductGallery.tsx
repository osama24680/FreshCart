"use client";
import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface IProps {
  images: string[];
  title: string;
}

const arrowClass =
  "size-9 border-0 bg-white/90 text-gray-700 shadow-md hover:scale-110 hover:bg-white hover:text-primary-600 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:focus-visible:opacity-100 [&_svg:not([class*='size-'])]:size-5";

const ProductGallery = ({ images, title }: IProps) => {
  const hasMany = images.length > 1;
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => setActive(mainApi.selectedScrollSnap());
    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi]);

  useEffect(() => {
    thumbsApi?.scrollTo(active);
  }, [thumbsApi, active]);

  const moveZoom = (e: MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    e.currentTarget.style.setProperty("--zoom-origin", `${x}% ${y}%`);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <Carousel
        setApi={setMainApi}
        opts={{ loop: hasMany, watchDrag: hasMany }}
        aria-label={`${title} images`}
        className="group overflow-hidden rounded-lg bg-gray-50"
      >
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div
                onMouseMove={moveZoom}
                className="relative aspect-3/4 overflow-hidden pointer-fine:cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={i === active ? title : ""}
                  fill
                  draggable={false}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="origin-(--zoom-origin) object-contain transition-transform duration-300 pointer-fine:group-hover:scale-150"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMany && (
          <>
            <CarouselPrevious className={cn("left-2", arrowClass)} />
            <CarouselNext className={cn("right-2", arrowClass)} />
            <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/60 px-2.5 py-0.5 text-xs text-white">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </Carousel>

      {hasMany && (
        <Carousel
          setApi={setThumbsApi}
          opts={{ dragFree: true }}
          aria-label="Choose an image"
          className="mt-3"
        >
          <CarouselContent className="ml-0 p-0.5">
            {images.map((src, i) => (
              <CarouselItem key={src} className="basis-auto pr-2 pl-0">
                <button
                  type="button"
                  aria-label={`Show image ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => mainApi?.scrollTo(i)}
                  className={cn(
                    "relative block aspect-3/4 w-16 overflow-hidden rounded-md bg-gray-50 transition-all",
                    i === active
                      ? "ring-2 ring-primary-600"
                      : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    draggable={false}
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default ProductGallery;

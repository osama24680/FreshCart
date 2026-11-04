import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, GitCompareArrows, Heart, Plus, Star } from "lucide-react";
import getProductsService from "@/api/products.service";
import Loading from "../Loading/Loading";
import Reveal from "../Reveal/Reveal";
import SectionHeading from "../SectionHeading/SectionHeading";

const fiveStars = (className: string) =>
  Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} className={`size-3.5 shrink-0 fill-current ${className}`} />
  ));

const Rating = ({ value }: { value: number }) => {
  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className="relative inline-flex"
    >
      {fiveStars("text-gray-200")}
      <span
        style={{ width: `${(value / 5) * 100}%` }}
        className="absolute inset-y-0 left-0 flex overflow-hidden"
      >
        {fiveStars("text-yellow-400")}
      </span>
    </span>
  );
};

const actionClass =
  "flex size-7 items-center justify-center rounded-full bg-white text-gray-600 sm:size-8 shadow-sm transition-all duration-200 hover:scale-110";

async function RenderFeaturedProducts() {
  const products = await getProductsService();
  if (!products?.length) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured"
          highlight="Products"
          link={{ label: "View All Products", href: "/products" }}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product, i) => {
            const { priceAfterDiscount: salePrice, price } = product;
            const discount = salePrice
              ? Math.round((1 - salePrice / price) * 100)
              : 0;

            return (
              <Reveal key={product._id} delay={(i % 6) * 70} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/10">
                  <div className="relative overflow-hidden">
                    <Link
                      href={`/products/${product._id}`}
                      className="relative block h-40 bg-white sm:h-60"
                    >
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {discount > 0 && (
                      <span className="absolute top-2 left-2 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2 py-0.5 text-[11px] sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-xs font-bold text-white shadow-sm">
                        -{discount}%
                      </span>
                    )}

                    {/* Slide in on hover for mouse users, always visible on touch */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 transition-all sm:top-3 sm:right-3 sm:gap-2 duration-300 pointer-fine:translate-x-3 pointer-fine:opacity-0 pointer-fine:group-focus-within:translate-x-0 pointer-fine:group-focus-within:opacity-100 pointer-fine:group-hover:translate-x-0 pointer-fine:group-hover:opacity-100">
                      <button
                        type="button"
                        title="Add to wishlist"
                        aria-label={`Add ${product.title} to wishlist`}
                        className={`${actionClass} hover:text-red-500 [&:hover>svg]:fill-current`}
                      >
                        <Heart className="size-4" />
                      </button>
                      <button
                        type="button"
                        title="Compare"
                        aria-label={`Compare ${product.title}`}
                        className={`${actionClass} hover:text-primary-600`}
                      >
                        <GitCompareArrows className="size-4" />
                      </button>
                      <Link
                        href={`/products/${product._id}`}
                        title="View product"
                        aria-label={`View ${product.title}`}
                        className={`${actionClass} hover:text-primary-600`}
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <p className="mb-1 text-xs text-gray-500">
                      {product.category.name}
                    </p>
                    <h3 className="mb-1 text-sm font-medium text-gray-800 transition-colors sm:text-base group-hover:text-primary-700">
                      <Link
                        href={`/products/${product._id}`}
                        title={product.title}
                        className="line-clamp-2"
                      >
                        {product.title}
                      </Link>
                    </h3>

                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <Rating value={product.ratingsAverage} />
                      <span className="text-xs text-gray-500">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-sm font-bold text-gray-800 sm:text-lg">
                          {salePrice ?? price} EGP
                        </span>
                        {salePrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {price} EGP
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        title="Add to cart"
                        aria-label={`Add ${product.title} to cart`}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 sm:size-10 text-white shadow-sm transition-all duration-300 hover:rotate-90 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const FeaturedProducts = () => {
  return (
    <Suspense fallback={<Loading label="Loading products" />}>
      <RenderFeaturedProducts />
    </Suspense>
  );
};

export default FeaturedProducts;

import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Apple, Carrot, Clock, Layers, Sprout } from "lucide-react";
import getCategoriesService from "@/api/categories.service";
import getProductCountsService from "@/api/getProductCounts.service";
import Loading from "../_components/Loading/Loading";
import Reveal from "../_components/Reveal/Reveal";

export const metadata: Metadata = {
  title: "All Categories | FreshCart",
  description: "Browse our wide range of product categories",
};

const imageSizes =
  "(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw";

const CategoriesGrid = async () => {
  const [categories, counts] = await Promise.all([
    getCategoriesService(),
    getProductCountsService(),
  ]);

  if (!categories?.length) {
    return (
      <p className="py-20 text-center text-gray-500">
        We couldn&apos;t load the categories right now. Please try again soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
      {categories.map((category, i) => {
        const count = counts?.[category._id] ?? 0;
        // counts is null when the request failed: keep the cards clickable
        const isEmpty = counts !== null && count === 0;

        return (
          <Reveal key={category._id} delay={(i % 5) * 80}>
            {isEmpty ? (
              <div
                aria-disabled="true"
                title="No products in this category yet"
                className="relative h-full cursor-not-allowed overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 p-4 sm:p-6"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes={imageSizes}
                    className="object-cover opacity-60 grayscale"
                  />
                  <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-gray-500 shadow-sm backdrop-blur-sm">
                    <Clock className="size-3" aria-hidden="true" />
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-center font-bold text-gray-500">
                  {category.name}
                </h3>
                <p className="mt-1 text-center text-xs text-gray-400">
                  No products yet
                </p>
              </div>
            ) : (
              <Link
                href={`/products?category=${category._id}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/10 sm:p-6"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes={imageSizes}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Green tint that fades in over the photo on hover */}
                  <span className="absolute inset-0 bg-linear-to-t from-primary-600/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <h3 className="text-center font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                  {category.name}
                </h3>
                {count > 0 && (
                  <p className="mt-1 text-center text-xs text-primary-600">
                    {count} {count === 1 ? "Product" : "Products"}
                  </p>
                )}

                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary-500 to-emerald-600 transition-all duration-500 group-hover:w-full" />
              </Link>
            )}
          </Reveal>
        );
      })}
    </div>
  );
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <section className="relative overflow-hidden bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        {/* Decorative background, hidden from screen readers */}
        <div className="absolute inset-0" aria-hidden="true">
          <span className="absolute -top-20 -right-16 size-72 rounded-full bg-white/10" />
          <span className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-white/5" />
          <Apple className="absolute top-8 right-[12%] hidden size-14 text-white/15 motion-safe:animate-float sm:block" />
          <Carrot className="absolute right-[30%] bottom-8 hidden size-10 text-white/15 motion-safe:animate-[float_8s_ease-in-out_1s_infinite] sm:block" />
          <Sprout className="absolute right-[5%] bottom-6 hidden size-11 text-white/15 motion-safe:animate-[float_7s_ease-in-out_0.5s_infinite] sm:block" />
        </div>

        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/40" aria-hidden="true">
              /
            </span>
            <span className="font-medium text-white" aria-current="page">
              Categories
            </span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
              <Layers className="size-8" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                All Categories
              </h1>
              <p className="mt-1 text-white/80">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <Suspense fallback={<Loading label="Loading categories" />}>
          <CategoriesGrid />
        </Suspense>
      </section>
    </main>
  );
}

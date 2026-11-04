import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import Reveal from "../Reveal/Reveal";
import SectionHeading from "../SectionHeading/SectionHeading";
import getCategoriesService from "@/api/categories.service";
import getProductCountsService from "@/api/getProductCounts.service";
import { Suspense } from "react";
import Loading from "../Loading/Loading";

const RenderDesign = async () => {
  const [categories, counts] = await Promise.all([
    getCategoriesService(),
    getProductCountsService(),
  ]);
  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Shop By"
          highlight="Category"
          link={{ label: "View All Categories", href: "/categories" }}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories?.map((cat, i: number) => {
            const count = counts?.[cat._id] ?? 0;
            // counts is null when the request failed: keep the cards clickable
            const isEmpty = counts !== null && count === 0;

            return (
              <Reveal
                key={cat._id}
                from="scale"
                delay={(i % 5) * 70}
                className="h-full"
              >
                {isEmpty ? (
                  <div
                    aria-disabled="true"
                    title="No products in this category yet"
                    className="h-full cursor-not-allowed rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-center"
                  >
                    <div className="mx-auto mb-3 size-20 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={160}
                        height={160}
                        className="size-full object-cover opacity-60 grayscale"
                      />
                    </div>
                    <h3 className="font-medium text-gray-500">{cat.name}</h3>
                    <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Clock className="size-3" aria-hidden="true" />
                      Coming Soon
                    </p>
                  </div>
                ) : (
                  <Link
                    href={`/products?category=${cat._id}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/10"
                  >
                    {/* Soft green wash that rises from the bottom on hover */}
                    <span className="absolute inset-x-0 bottom-0 h-0 bg-linear-to-t from-primary-50 to-transparent transition-all duration-500 group-hover:h-full" />

                    <div className="relative mx-auto mb-3 size-20">
                      {/* Dashed ring that spins in around the image */}
                      <span className="absolute -inset-1.5 rounded-full border-2 border-dashed border-primary-300 opacity-0 transition-all duration-700 group-hover:rotate-180 group-hover:opacity-100" />
                      <div className="relative size-20 overflow-hidden rounded-full bg-primary-100 ring-4 ring-white transition-colors group-hover:bg-primary-200">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={160}
                          height={160}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-115"
                        />
                      </div>
                    </div>

                    <h3 className="relative font-medium text-gray-700 transition-colors group-hover:text-primary-700">
                      {cat.name}
                    </h3>
                    {count > 0 && (
                      <p className="relative mt-0.5 text-xs text-primary-600">
                        {count} {count === 1 ? "Product" : "Products"}
                      </p>
                    )}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ShopByCategory = async () => {
  return (
    <Suspense fallback={<Loading label="Loading categories" />}>
      {<RenderDesign />}
    </Suspense>
  );
};

export default ShopByCategory;

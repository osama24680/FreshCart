import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import Reveal from "../Reveal/Reveal";
import SectionHeading from "../SectionHeading/SectionHeading";

const ShopByCategory = async () => {
  const categories = await getCategories();
  if (categories.length === 0) return null;

  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Shop By"
          highlight="Category"
          link={{ label: "View All Categories", href: "/categories" }}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <Reveal key={cat._id} from="scale" delay={(i % 6) * 70}>
              <Link
                href={`/categories/${cat._id}`}
                className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/10"
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
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;

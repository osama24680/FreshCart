import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  House,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import fetchProductDetails from "@/api/productDetails.service";
import Loading from "@/app/_components/Loading/Loading";
import ProductGallery from "@/app/_components/ProductDetails/ProductGallery";
import ProductPurchase from "@/app/_components/ProductDetails/ProductPurchase";
import ProductTabs from "@/app/_components/ProductDetails/ProductTabs";
import Rating from "@/app/_components/Rating/Rating";

interface IProps {
  params: Promise<{ id: string }>;
}

const guarantees = [
  { Icon: Truck, title: "Free Delivery", text: "Orders over 500 EGP" },
  { Icon: RotateCcw, title: "14 Days Return", text: "Money back" },
  { Icon: ShieldCheck, title: "Secure Payment", text: "100% Protected" },
];

const crumbClass =
  "flex items-center gap-1.5 text-gray-500 transition hover:text-primary-600";

const parseSpecs = (description: string) => {
  const rows = description
    .split("\n")
    .map((line) => line.split("\t").map((part) => part.trim()))
    .filter((row) => row.join("") !== "");
  const isTable = rows.length > 0 && rows.every((row) => row.length === 2);
  return isTable ? rows : null;
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductDetails(id);
  return { title: `${product?.title ?? "Product Not Found"} | FreshCart` };
}

const RenderDesign = async ({ params }: IProps) => {
  const { id } = await params;
  const product = await fetchProductDetails(id);
  if (!product) notFound();

  const { price, priceAfterDiscount: salePrice, quantity: stock } = product;
  const unitPrice = salePrice ?? price;
  const discount = salePrice ? Math.round((1 - salePrice / price) * 100) : 0;
  const images = product.images.length ? product.images : [product.imageCover];
  const specs = parseSpecs(product.description);
  const subcategory = product.subcategory[0]?.name;
  const categoryHref = `/products?category=${product.category._id}`;

  return (
    <main className="min-h-screen bg-gray-50/50">
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="container mx-auto flex flex-wrap items-center gap-1 px-4 text-sm">
          <li className="flex items-center">
            <Link href="/" className={crumbClass}>
              <House className="size-3.5" aria-hidden="true" />
              Home
            </Link>
            <ChevronRight
              className="mx-1.5 size-3.5 text-gray-400"
              aria-hidden="true"
            />
          </li>
          <li className="flex items-center">
            <Link href={categoryHref} className={crumbClass}>
              {product.category.name}
            </Link>
            <ChevronRight
              className="mx-1.5 size-3.5 text-gray-400"
              aria-hidden="true"
            />
          </li>
          {subcategory && (
            <li className="flex items-center text-gray-500">
              {subcategory}
              <ChevronRight
                className="mx-1.5 size-3.5 text-gray-400"
                aria-hidden="true"
              />
            </li>
          )}
          <li
            aria-current="page"
            className="max-w-xs truncate font-medium text-gray-900"
          >
            {product.title}
          </li>
        </ol>
      </nav>

      <section className="container mx-auto px-4 pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="lg:sticky lg:top-24 lg:w-1/3 lg:self-start xl:w-1/4">
            <ProductGallery images={images} title={product.title} />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm lg:w-2/3 xl:w-3/4">
            <div className="mb-4 flex flex-wrap gap-2">
              <Link
                href={categoryHref}
                className="rounded-full bg-primary-50 px-3 py-1.5 text-xs text-primary-700 transition hover:bg-primary-100"
              >
                {product.category.name}
              </Link>
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
                {product.brand.name}
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
              {product.title}
            </h1>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Rating value={product.ratingsAverage} starClassName="size-5" />
              <span className="text-sm text-gray-600">
                {product.ratingsAverage} ({product.ratingsQuantity} reviews)
              </span>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {unitPrice} EGP
              </span>
              {salePrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {price} EGP
                  </span>
                  <span className="rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2.5 py-1 text-xs font-bold text-white">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              {stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm text-green-700">
                  <span className="relative flex size-2">
                    <span className="absolute size-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
                    <span className="relative size-2 rounded-full bg-green-500" />
                  </span>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm text-red-700">
                  <span className="size-2 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            <div className="mb-6 border-t border-gray-100 pt-5">
              {specs ? (
                <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                  {specs.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 border-b border-gray-100 pb-2"
                    >
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="text-right font-medium text-gray-800">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="leading-relaxed whitespace-pre-line text-gray-600">
                  {product.description}
                </p>
              )}
            </div>

            <ProductPurchase
              title={product.title}
              unitPrice={unitPrice}
              stock={stock}
            />

            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
              {guarantees.map(({ Icon, title, text }) => (
                <div key={title} className="group flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">
                      {title}
                    </h2>
                    <p className="text-xs text-gray-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-10">
        <ProductTabs product={product} />
      </section>
    </main>
  );
};

const page = ({ params }: IProps) => {
  return (
    <Suspense
      fallback={<Loading label="Loading product" className="min-h-screen" />}
    >
      <RenderDesign params={params} />
    </Suspense>
  );
};

export default page;

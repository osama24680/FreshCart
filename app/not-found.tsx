import type { Metadata } from "next";
import Link from "next/link";
import {
  Apple,
  Carrot,
  Citrus,
  House,
  ShoppingCart,
  Sprout,
} from "lucide-react";
import GoBackButton from "./_components/GoBackButton/GoBackButton";

export const metadata: Metadata = {
  title: "Page Not Found | FreshCart",
};

const floatingIcons = [
  { Icon: Apple, className: "top-[10%] left-[5%] size-9 text-primary-200 animate-float" },
  { Icon: Carrot, className: "top-[20%] right-[10%] size-7.5 text-primary-200 animate-[float_8s_ease-in-out_1s_infinite]" },
  { Icon: Citrus, className: "bottom-[25%] left-[8%] size-7.5 text-primary-200 animate-[float_7s_ease-in-out_0.5s_infinite]" },
  { Icon: Sprout, className: "bottom-[15%] right-[15%] size-9 text-primary-200 animate-[float_9s_ease-in-out_2s_infinite]" },
  { Icon: Apple, className: "top-[50%] left-[15%] size-6 text-primary-100 animate-[float_5s_ease-in-out_1.5s_infinite]" },
  { Icon: Carrot, className: "top-[40%] right-[5%] size-6 text-primary-100 animate-[float_6s_ease-in-out_0.8s_infinite]" },
];

const destinations = [
  { label: "All Products", href: "/products", primary: true },
  { label: "Categories", href: "/categories" },
  { label: "Today's Deals", href: "/deals" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbfc] px-4 py-16">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {floatingIcons.map(({ Icon, className }, i) => (
          <Icon key={i} className={`absolute ${className}`} />
        ))}
        <span className="absolute top-0 right-0 size-125 rounded-full bg-linear-to-bl from-primary-100/40 to-transparent blur-3xl" />
        <span className="absolute bottom-0 left-0 size-100 rounded-full bg-linear-to-tr from-primary-100/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-10 flex justify-center" aria-hidden="true">
          <div className="relative">
            <div className="absolute inset-0 h-52 w-64 rounded-[32px] bg-primary-100/50 blur-2xl sm:h-60 sm:w-72" />
            <div className="relative h-52 w-64 sm:h-60 sm:w-72">
              <div className="absolute inset-x-0 top-4 mx-auto flex h-40 w-52 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:h-44 sm:w-60">
                <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-transparent to-primary-100/40" />
                <ShoppingCart className="relative size-15 text-primary-400/80 sm:size-18" />
              </div>

              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/40 sm:size-20">
                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      404
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4">
                <div className="size-2.5 rounded-full bg-primary-400" />
                <div className="h-4 w-8 rounded-b-full border-b-[3px] border-primary-400" />
                <div className="size-2.5 rounded-full bg-primary-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Oops! Nothing Here
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 sm:w-auto"
          >
            <House className="size-5 transition-transform duration-300 group-hover:scale-110" />
            Go to Homepage
          </Link>
          <GoBackButton />
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-medium tracking-wider text-gray-400 uppercase">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                  d.primary
                    ? "bg-primary-50 text-primary-700 hover:bg-primary-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

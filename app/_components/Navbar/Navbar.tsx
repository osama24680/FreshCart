"use client";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import {
  ChevronDown,
  Headset,
  Heart,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { navCategories, navLinks } from "./navLinks";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18 lg:gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/freshcart-logo.svg"
              alt="FreshCart"
              width={160}
              height={31}
              priority
              className="h-6 w-auto lg:h-8"
            />
          </Link>

          <Form action="/products" className="hidden max-w-2xl flex-1 lg:flex">
            <div className="relative w-full">
              <input
                type="search"
                name="q"
                placeholder="Search for products, brands and more..."
                aria-label="Search products"
                className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-5 py-3 pr-12 text-sm transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
              >
                <Search className="size-3.5" />
              </button>
            </div>
          </Form>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {navLinks.map((link) =>
              link.label === "Categories" ? (
                <div key={link.href} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex items-center gap-1.5 py-2 font-medium text-gray-700 transition-colors hover:text-primary-600"
                  >
                    Categories
                    <ChevronDown className="size-2.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute top-full left-0 pt-1 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-50 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                      {navCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group/nav relative py-2 font-medium text-gray-700 transition-colors hover:text-primary-600"
                >
                  {link.label}
                  {/* Underline that grows out from the centre */}
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary-600 transition-all duration-300 group-hover/nav:w-full" />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              href="/contact"
              className="mr-2 hidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 lg:flex"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-50">
                <Headset className="size-4 text-primary-600" />
              </span>
              <span className="text-xs">
                <span className="block text-gray-400">Support</span>
                <span className="block font-semibold text-gray-700">
                  24/7 Help
                </span>
              </span>
            </Link>

            <Link
              href="/wishlist"
              title="Wishlist"
              aria-label="Wishlist"
              className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
            >
              <Heart className="size-5 text-gray-500 transition-all group-hover:scale-110 group-hover:fill-red-500 group-hover:text-red-500" />
            </Link>
            <Link
              href="/cart"
              title="Cart"
              aria-label="Cart"
              className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
            >
              <ShoppingCart className="size-5 text-gray-500 transition-all group-hover:-rotate-12 group-hover:text-primary-600" />
            </Link>

            <Link
              href="/login"
              className="ml-2 hidden items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 lg:flex"
            >
              <User className="size-3" />
              Sign In
            </Link>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

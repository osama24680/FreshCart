"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { Headset, Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { navLinks } from "./navLinks";

const linkClass =
  "flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock page scroll and close on Escape while the drawer is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="ml-1 flex size-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 xl:hidden"
      >
        <Menu className="size-4.5" />
      </button>

      <div
        onClick={close}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 overflow-hidden bg-black/50 transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!open}
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4">
            <Image
              src="/images/freshcart-logo.svg"
              alt="FreshCart"
              width={160}
              height={31}
              className="h-8 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <X className="size-4" />
            </button>
          </div>

          <Form
            action="/products"
            onSubmit={close}
            className="border-b border-gray-100 p-4"
          >
            <div className="relative">
              <input
                type="search"
                name="q"
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary-600 text-white"
              >
                <Search className="size-3.5" />
              </button>
            </div>
          </Form>

          <nav className="space-y-1 p-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={linkClass}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mx-4 border-t border-gray-100" />

          <div className="space-y-1 p-4">
            <Link href="/wishlist" onClick={close} className={linkClass}>
              <span className="flex size-9 items-center justify-center rounded-full bg-red-50">
                <Heart className="size-4 text-red-500" />
              </span>
              Wishlist
            </Link>
            <Link href="/cart" onClick={close} className={linkClass}>
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-50">
                <ShoppingCart className="size-4 text-primary-600" />
              </span>
              Cart
            </Link>
          </div>

          <div className="mx-4 border-t border-gray-100" />

          <div className="grid grid-cols-2 gap-3 p-4 pt-6">
            <Link
              href="/login"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary-600 px-4 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50"
            >
              Sign Up
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={close}
            className="mx-4 mt-2 mb-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-primary-50"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary-100">
              <Headset className="size-4 text-primary-600" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-gray-700">
                Need Help?
              </span>
              <span className="block text-sm text-primary-600">
                Contact Support
              </span>
            </span>
          </Link>
        </aside>
      </div>
    </>
  );
};

export default MobileMenu;

"use client";
import { useState, type ChangeEvent } from "react";
import {
  Check,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Zap,
} from "lucide-react";

interface IProps {
  title: string;
  unitPrice: number;
  stock: number;
}

const stepClass =
  "flex size-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600";

const ProductPurchase = ({ title, unitPrice, stock }: IProps) => {
  const inStock = stock > 0;
  const [quantity, setQuantity] = useState(1);
  const [shared, setShared] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value)) || 0;
    setQuantity(Math.min(Math.max(value, 0), stock));
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  };

  const total = unitPrice * Math.max(quantity, 1);

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200 transition-colors focus-within:border-primary-500">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={!inStock || quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
              className={stepClass}
            >
              <Minus className="size-4" />
            </button>
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={stock}
              disabled={!inStock}
              value={quantity || ""}
              onChange={handleInput}
              onBlur={() => setQuantity(Math.max(quantity, 1))}
              className="w-14 bg-transparent text-center text-lg font-medium [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={!inStock || quantity >= stock}
              onClick={() => setQuantity(quantity + 1)}
              className={stepClass}
            >
              <Plus className="size-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">{stock} available</span>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-4">
        <span className="text-gray-600">Total Price:</span>
        <span
          aria-live="polite"
          className="text-2xl font-bold text-primary-600"
        >
          {total.toFixed(2)} EGP
        </span>
      </div>

      {/* TODO: connect cart, buy now and wishlist once auth and context exist */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!inStock}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 active:scale-[0.98] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          <ShoppingCart className="size-5 transition-transform group-hover:-rotate-12" />
          Add to Cart
        </button>
        <button
          type="button"
          disabled={!inStock}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl active:scale-[0.98] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <Zap className="size-5 transition-transform group-hover:scale-110 group-hover:fill-current" />
          Buy Now
        </button>
      </div>

      <div className="mb-6 flex gap-3">
        <button
          type="button"
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-200 px-4 py-3 font-medium text-primary-700 transition hover:border-primary-400 hover:bg-primary-50"
        >
          <Heart className="size-5 transition-transform group-hover:scale-110 group-hover:fill-current" />
          Add to Wishlist
        </button>
        <button
          type="button"
          onClick={share}
          aria-label={shared ? "Link copied" : "Share this product"}
          title={shared ? "Link copied" : "Share"}
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          {shared ? (
            <Check className="size-5 text-primary-600" />
          ) : (
            <Share2 className="size-5" />
          )}
        </button>
      </div>
    </>
  );
};

export default ProductPurchase;

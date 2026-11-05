"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  Check,
  Package,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { IProductDetails } from "@/interfaces";
import { cn } from "@/lib/utils";
import ReviewsPanel from "./ReviewsPanel";

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

const policies = [
  {
    Icon: Truck,
    title: "Shipping Information",
    box: "from-primary-50 to-primary-100",
    circle: "bg-primary-600",
    check: "text-primary-600",
    items: [
      "Free shipping on orders over 500 EGP",
      "Standard delivery: 3-5 business days",
      "Express delivery available (1-2 business days)",
      "Track your order in real-time",
    ],
  },
  {
    Icon: RotateCcw,
    title: "Returns & Refunds",
    box: "from-emerald-50 to-emerald-100",
    circle: "bg-emerald-600",
    check: "text-emerald-600",
    items: [
      "14-day hassle-free returns",
      "Full refund or exchange available",
      "Free return shipping on defective items",
      "Easy online return process",
    ],
  },
];

const DetailsPanel = ({ product }: { product: IProductDetails }) => {
  const info = [
    { label: "Category", value: product.category.name },
    { label: "Subcategory", value: product.subcategory[0]?.name },
    { label: "Brand", value: product.brand.name },
    {
      label: "Items Sold",
      value: product.sold ? `${product.sold}+ sold` : null,
    },
  ].filter((row) => row.value);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          About this Product
        </h2>
        <p className="leading-relaxed whitespace-pre-line text-gray-600">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-3 font-medium text-gray-900">
            Product Information
          </h3>
          <dl className="space-y-2 text-sm">
            {info.map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-gray-500">{label}</dt>
                <dd className="text-right font-medium text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-3 font-medium text-gray-900">Key Features</h3>
          <ul className="space-y-2">
            {keyFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Check
                  className="size-4 shrink-0 text-primary-600"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ShippingPanel = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {policies.map(({ Icon, title, box, circle, check, items }) => (
          <div
            key={title}
            className={cn("group rounded-lg bg-linear-to-br p-6", box)}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-6",
                  circle,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold text-gray-900">{title}</h2>
            </div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check
                    className={cn("mt-0.5 size-4 shrink-0", check)}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-6">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
          <ShieldCheck className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="mb-1 font-semibold text-gray-900">
            Buyer Protection Guarantee
          </h2>
          <p className="text-sm text-gray-600">
            Get a full refund if your order doesn&apos;t arrive or isn&apos;t as
            described. We ensure your shopping experience is safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductTabs = ({ product }: { product: IProductDetails }) => {
  const tabs = [
    { id: "details", label: "Product Details", Icon: Package },
    {
      id: "reviews",
      label: `Reviews (${product.ratingsQuantity})`,
      Icon: Star,
    },
    { id: "shipping", label: "Shipping & Returns", Icon: Truck },
  ];
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div
        role="tablist"
        aria-label="Product information"
        onKeyDown={handleKeyDown}
        className="flex overflow-x-auto border-b border-gray-200 scrollbar-none"
      >
        {tabs.map(({ id, label, Icon }, i) => (
          <button
            key={id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            id={`tab-${id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "group flex items-center gap-2 border-b-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200",
              i === active
                ? "border-primary-600 bg-primary-50/60 text-primary-600"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-primary-600",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform group-hover:scale-110",
                i === active && "fill-current",
              )}
            />
            {label}
          </button>
        ))}
      </div>

      {/* key restarts the fade (and the bars' grow) whenever the tab changes */}
      <div
        key={tabs[active].id}
        id={`panel-${tabs[active].id}`}
        role="tabpanel"
        aria-labelledby={`tab-${tabs[active].id}`}
        className="p-6 motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
      >
        {active === 0 && <DetailsPanel product={product} />}
        {active === 1 && <ReviewsPanel product={product} />}
        {active === 2 && <ShippingPanel />}
      </div>
    </div>
  );
};

export default ProductTabs;

import { Headset, RotateCcw, ShieldHalf, Truck } from "lucide-react";

const features = [
  { Icon: Truck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { Icon: RotateCcw, title: "Easy Returns", text: "14-day return policy" },
  { Icon: ShieldHalf, title: "Secure Payment", text: "100% secure checkout" },
  { Icon: Headset, title: "24/7 Support", text: "Contact us anytime" },
];

const Features = () => {
  return (
    <section
      className="border-y border-primary-100 bg-primary-50"
      aria-label="Store features"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="group flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary-600 group-hover:shadow-lg group-hover:shadow-primary-600/30">
                <Icon className="size-4.5 text-primary-600 transition-colors group-hover:text-white" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

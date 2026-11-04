import { Leaf, Mail, Smartphone, Star, Tag, Truck } from "lucide-react";
import Reveal from "../Reveal/Reveal";
import NewsletterForm from "./NewsletterForm";
import { AppleLogo, GooglePlayLogo } from "./StoreIcons";

const perks = [
  { Icon: Leaf, label: "Fresh Picks Weekly" },
  { Icon: Truck, label: "Free Delivery Codes" },
  { Icon: Tag, label: "Members-Only Deals" },
];

// TODO: replace "#" with the real store links once the app is published
const stores = [
  { Logo: AppleLogo, small: "Download on", name: "App Store", href: "#" },
  { Logo: GooglePlayLogo, small: "Get it on", name: "Google Play", href: "#" },
];

const Newsletter = () => {
  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-16">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100/50 bg-linear-to-br from-emerald-50 via-white to-teal-50 shadow-2xl shadow-emerald-500/10">
            <span className="pointer-events-none absolute top-0 right-0 size-80 translate-x-1/4 -translate-y-1/2 rounded-full bg-linear-to-br from-emerald-200/40 to-transparent blur-3xl" />
            <span className="pointer-events-none absolute bottom-0 left-0 size-64 -translate-x-1/4 translate-y-1/2 rounded-full bg-linear-to-tr from-teal-200/30 to-transparent blur-3xl" />

            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:p-14">
              <div className="space-y-6 lg:col-span-3">
                <div className="group/badge flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover/badge:-rotate-6">
                    <Mail className="size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
                      Newsletter
                    </p>
                    <p className="text-xs text-gray-500">50,000+ subscribers</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl leading-snug font-bold text-balance text-gray-900 lg:text-4xl">
                    Get the Freshest Updates{" "}
                    <span className="text-emerald-600">Delivered Free</span>
                  </h2>
                  <p className="mt-3 text-lg text-gray-500">
                    Weekly recipes, seasonal offers &amp; exclusive member perks.
                  </p>
                </div>

                <ul className="flex flex-wrap gap-3">
                  {perks.map(({ Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                    >
                      <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <NewsletterForm />
              </div>

              <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                <div className="flex h-full flex-col justify-center">
                  <div className="group/app relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 p-6 text-white sm:p-8">
                    {/* Glows swell slowly when the card is hovered */}
                    <span className="absolute top-0 right-0 size-32 rounded-full bg-emerald-500/20 blur-2xl transition-transform duration-700 group-hover/app:scale-150" />
                    <span className="absolute bottom-0 left-0 size-24 rounded-full bg-teal-500/20 blur-2xl transition-transform duration-700 group-hover/app:scale-150" />

                    <div className="relative space-y-5">
                      <p className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                        <Smartphone className="size-3.5" aria-hidden="true" />
                        MOBILE APP
                      </p>
                      <h3 className="text-2xl leading-tight font-bold">
                        Shop Faster on Our App
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400">
                        Get app-exclusive deals &amp; 15% off your first order.
                      </p>

                      <div className="flex flex-col gap-3 pt-2">
                        {stores.map(({ Logo, small, name, href }) => (
                          <a
                            key={name}
                            href={href}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white/25 hover:bg-white/15"
                          >
                            <Logo />
                            <span>
                              <span className="block text-[10px] tracking-wide text-gray-400 uppercase">
                                {small}
                              </span>
                              <span className="-mt-0.5 block text-sm font-semibold">
                                {name}
                              </span>
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-sm">
                        <span
                          role="img"
                          aria-label="Rated 4.9 out of 5"
                          className="flex text-yellow-400"
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="size-3.5 fill-current" />
                          ))}
                        </span>
                        <span className="text-gray-400">
                          4.9 • 100K+ downloads
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;

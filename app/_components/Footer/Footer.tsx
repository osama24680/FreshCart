import Image from "next/image";
import Link from "next/link";
import { CreditCard, Mail, MapPin, Phone } from "lucide-react";
import CurrentYear from "./CurrentYear";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./SocialIcons";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/products?category=6439d58a0049ad0b52b9003f" },
      { label: "Men's Fashion", href: "/products?category=6439d2d167d9aa4ca970649f" },
      { label: "Women's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/profile/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

// TODO: replace "#" with the real social accounts
const socials = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

const payments = ["Visa", "Mastercard", "PayPal"];

const linkClass = "text-sm text-gray-400 transition-colors hover:text-primary-400";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="mb-6 inline-block rounded-lg bg-white px-4 py-2"
            >
              <Image
                src="/images/freshcart-logo.svg"
                alt="FreshCart Logo"
                width={160}
                height={31}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="mb-6 space-y-3">
              <a
                href="tel:+18001234567"
                className={`flex items-center gap-3 ${linkClass}`}
              >
                <Phone className="size-3.5 text-primary-500" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className={`flex items-center gap-3 ${linkClass}`}
              >
                <Mail className="size-3.5 text-primary-500" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary-500" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/40 [&>svg]:size-4"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="mb-5 text-lg font-semibold">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {/* A small green dash slides in before the text on hover */}
                    <Link
                      href={link.href}
                      className={`group/link inline-flex items-center ${linkClass}`}
                    >
                      <span className="mr-0 h-px w-0 bg-primary-400 transition-all duration-300 group-hover/link:mr-2 group-hover/link:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © <CurrentYear /> FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {payments.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <CreditCard className="size-3.5" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";
import { Gift, Mail, Phone, Truck, User, UserPlus } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="hidden border-b border-gray-100 text-sm lg:block">
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <Truck className="size-3 text-primary-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </span>
            <span className="flex items-center gap-2">
              <Gift className="size-3 text-primary-600" />
              <span>New Arrivals Daily</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
              >
                <Phone className="size-3" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
              >
                <Mail className="size-3" />
                <span>support@freshcart.com</span>
              </a>
            </div>

            <span className="h-4 w-px bg-gray-200" aria-hidden="true" />

            <div className="flex items-center gap-4 text-gray-600">
              <Link
                href="/login"
                className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
              >
                <User className="size-3" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
              >
                <UserPlus className="size-3" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

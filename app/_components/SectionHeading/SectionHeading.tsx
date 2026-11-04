import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface IProps {
  title: string;
  highlight: string; // the green part of the title
  link?: { label: string; href: string };
}

const SectionHeading = ({ title, highlight, link }: IProps) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="group/heading flex items-center gap-3">
        {/* Accent bar grows a little when the heading is hovered */}
        <span className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700 transition-all duration-300 group-hover/heading:h-10" />
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          {title}{" "}
          <span className="bg-linear-to-r from-emerald-600 to-primary-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        </h2>
      </div>

      {link && (
        <Link
          href={link.href}
          className="group/link flex items-center gap-2 self-end font-medium text-primary-600 transition-colors hover:text-primary-700 sm:self-auto"
        >
          <span className="relative">
            {link.label}
            {/* Underline that draws itself from left to right */}
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-current transition-all duration-300 group-hover/link:w-full" />
          </span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;

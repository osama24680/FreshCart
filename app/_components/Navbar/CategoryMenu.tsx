import { Suspense } from "react";
import Link from "next/link";
import getProductCountsService from "@/api/getProductCounts.service";
import { productCounts } from "@/types";
import { navCategories } from "./navLinks";

const MenuItems = ({ counts }: { counts: productCounts | null }) => {
  return navCategories.map((cat) => {
    const isEmpty =
      counts !== null && cat.categoryId && !counts[cat.categoryId];

    return isEmpty ? (
      <div
        key={cat.href}
        aria-disabled="true"
        title="No products in this category yet"
        className="flex cursor-not-allowed items-center justify-between gap-3 px-4 py-2.5 whitespace-nowrap text-gray-400"
      >
        {cat.label}
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
          Soon
        </span>
      </div>
    ) : (
      <Link
        key={cat.href}
        href={cat.href}
        className="block px-4 py-2.5 whitespace-nowrap text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
      >
        {cat.label}
      </Link>
    );
  });
};

const MenuItemsWithCounts = async () => {
  const counts = await getProductCountsService();
  return <MenuItems counts={counts} />;
};

// Shows every link right away, then disables the empty ones once counts arrive
const CategoryMenu = () => {
  return (
    <Suspense fallback={<MenuItems counts={null} />}>
      <MenuItemsWithCounts />
    </Suspense>
  );
};

export default CategoryMenu;

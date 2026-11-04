export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

const categoryLink = (label: string, categoryId: string) => ({
  label,
  categoryId,
  href: `/products?category=${categoryId}`,
});

export const navCategories: {
  label: string;
  href: string;
  categoryId?: string;
}[] = [
  { label: "All Categories", href: "/categories" },
  categoryLink("Electronics", "6439d2d167d9aa4ca970649f"),
  categoryLink("Women's Fashion", "6439d58a0049ad0b52b9003f"),
  categoryLink("Men's Fashion", "6439d5b90049ad0b52b90048"),
  categoryLink("Beauty & Health", "6439d30b67d9aa4ca97064b1"),
];

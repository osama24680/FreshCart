import { From } from "@/types";
import { ReactNode } from "react";

export interface sectionHeadingProps {
  title: string;
  highlight: string;
  link?: { label: string; href: string };
}
export interface categoryData {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface loadingProps {
  label?: string;
  className?: string;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^IProduct^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export interface IProduct {
  sold: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^IProduct^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
export interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number; // ms — use it to stagger items in a grid
}

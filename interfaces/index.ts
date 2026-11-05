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

export interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number; // ms — use it to stagger items in a grid
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

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ProductDetails^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

interface IUser {
  _id: string;
  name: string;
}

interface IReview {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductDetails {
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
  __v: number;
  reviews: IReview[];
  id: string;
}

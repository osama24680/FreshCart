import "./setupNetwork";
import { cacheLife } from "next/cache";
import { categoryData } from "../interfaces/index";
import { baseURL } from "./constants";

const fetchCategories = async (): Promise<categoryData[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${baseURL}/api/v1/categories`);
  if (!res.ok) throw new Error(`Categories request failed: ${res.status}`);
  const data = await res.json();
  return data.data;
};

// Throwing above keeps a failed request out of the cache
const getCategoriesService = async (): Promise<categoryData[]> => {
  try {
    return await fetchCategories();
  } catch {
    return [];
  }
};

export default getCategoriesService;

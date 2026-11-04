import "./setupNetwork";
import { cacheLife } from "next/cache";
import { IProduct } from "../interfaces/index";
import { baseURL } from "./constants";

const fetchProducts = async (): Promise<IProduct[]> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${baseURL}/api/v1/products?limit=12`);
  if (!res.ok) throw new Error(`Products request failed: ${res.status}`);
  const data = await res.json();
  return data.data;
};

// Throwing above keeps a failed request out of the cache
const getProductsService = async (): Promise<IProduct[]> => {
  try {
    return await fetchProducts();
  } catch {
    return [];
  }
};

export default getProductsService;

import "./setupNetwork";
import { cacheLife } from "next/cache";
import { IProductDetails } from "../interfaces/index";
import { baseURL } from "./constants";

// null means the product doesn't exist (the API sends 400 for a malformed id)
const fetchProductDetails = async (
  id: string,
): Promise<IProductDetails | null> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${baseURL}/api/v1/products/${id}`);
  if (res.status === 400 || res.status === 404) return null;
  if (!res.ok) throw new Error(`Product details request failed: ${res.status}`);
  const data = await res.json();
  return data.data;
};

export default fetchProductDetails;

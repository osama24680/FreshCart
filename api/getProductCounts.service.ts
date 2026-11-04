import "./setupNetwork";
import { cacheLife } from "next/cache";
import { productCounts } from "@/types";
import { baseURL } from "./constants";

const fetchProductCounts = async (): Promise<productCounts> => {
  "use cache";
  cacheLife("hours");

  const counts: productCounts = {};
  let page = 1;
  let numberOfPages = 1;

  do {
    const res = await fetch(
      `${baseURL}/api/v1/products?fields=category&limit=50&page=${page}`,
    );
    if (!res.ok) throw new Error(`Products request failed: ${res.status}`);

    const json = await res.json();
    for (const product of json.data) {
      const id = product.category._id;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    numberOfPages = json.metadata.numberOfPages;
    page++;
  } while (page <= numberOfPages);

  return counts;
};

const getProductCountsService = async (): Promise<productCounts | null> => {
  try {
    return await fetchProductCounts();
  } catch {
    return null;
  }
};

export default getProductCountsService;

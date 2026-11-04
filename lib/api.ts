import { cacheLife } from "next/cache";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Categories rarely change, so the response is cached for hours
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) return [];
    const json: { data: Category[] } = await res.json();
    return json.data;
  } catch {
    return []; // the section just hides itself if the API is down
  }
}

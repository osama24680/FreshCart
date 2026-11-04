import { cacheLife } from "next/cache";

// With cacheComponents on, new Date() must run inside "use cache" (or at request time)
const CurrentYear = async () => {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
};

export default CurrentYear;

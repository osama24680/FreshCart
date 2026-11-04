import Carousel from "./_components/Carousel/Carousel";
import DealBanners from "./_components/DealBanners/DealBanners";
import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import Newsletter from "./_components/Newsletter/Newsletter";
import PromoCards from "./_components/PromoCards/PromoCards";
import ShopByCategory from "./_components/ShopByCategory/ShopByCategory";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">
        FreshCart: fresh groceries and everyday essentials
      </h1>
      <Carousel />
      <PromoCards />
      <ShopByCategory />
      <DealBanners />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}

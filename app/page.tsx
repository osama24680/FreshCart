import Carousel from "./_components/Carousel/Carousel";
import DealBanners from "./_components/DealBanners/DealBanners";
import PromoCards from "./_components/PromoCards/PromoCards";
import ShopByCategory from "./_components/ShopByCategory/ShopByCategory";

export default function Home() {
  return (
    <main>
      <Carousel />
      <PromoCards />
      <ShopByCategory />
      <DealBanners />
    </main>
  );
}

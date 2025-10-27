import Cart from "../../components/Cart/Cart";
import FreeShipping from "../../components/Home/FreeShipping";
import ProductsGrid from "../../components/Home/ProductsGrid";

import HeroSection from "./HeroSection";
import OffersBanner from "./OffersBanner";

const Home = () => {
  return (
    <>
      <main>
        <HeroSection />
        <FreeShipping />
        <OffersBanner />
        <ProductsGrid />
      </main>
    </>
  );
};

export default Home;

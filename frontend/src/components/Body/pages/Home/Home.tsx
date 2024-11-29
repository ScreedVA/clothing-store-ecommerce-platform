import LogoBanner from "../../../templates/LogoBanner/LogoBanner";
import "./Home.css";
import Hero from "./pages/Hero/Hero";
import gucciImg from "../../../../assets/Gucci-Fragrances-webp-file.webp";
import ClothingFeature from "../../../templates/ClothingFeature/ClothingFeature";

// New Clothes Images
import clothingImg1 from "../../../../../src/assets/New Arrivals/pants-2-png.png";
import clothingImg2 from "../../../../../src/assets/New Arrivals/sneaker-shoe-png.png";
import clothingImg3 from "../../../../../src/assets/New Arrivals/pants-png.png";
import { useState } from "react";
import { ClothingCarouselDetails } from "../../../../models/CarouselModels";

// Top Clothes Images
import clothingImg4 from "../../../../assets/Top Clothes/yellow-winter-hat-png.png";
import clothingImg5 from "../../../../assets/Top Clothes/pink-gloves-png.png";
import clothingImg6 from "../../../../assets/Top Clothes/white-winter-hat-png.png";

function Home() {
  const [newClothesCarouselList] = useState<ClothingCarouselDetails[]>([
    {
      clothingImgPath: clothingImg1,
      clothingTitle: "Blue Pants",
      clothingPrice: 208,
      clothingImgAlt: "blue pants",
    },
    {
      clothingImgPath: clothingImg2,
      clothingTitle: "Sneakers",
      clothingPrice: 120,
      clothingImgAlt: "sneakers",
    },
    {
      clothingImgPath: clothingImg3,
      clothingTitle: "Green Pants",
      clothingPrice: 180,
      clothingImgAlt: "green pants",
    },
  ]);

  const [topClothesCarouselList] = useState<ClothingCarouselDetails[]>([
    {
      clothingImgPath: clothingImg4,
      clothingPrice: 300,
      clothingTitle: "Blue Fedora",
      clothingImgAlt: "blue fedora",
    },
    {
      clothingImgPath: clothingImg5,
      clothingPrice: 250,
      clothingTitle: "Pink Gloves",
      clothingImgAlt: "pink gloves",
    },
    {
      clothingImgPath: clothingImg6,
      clothingPrice: 500,
      clothingTitle: "White Winter Hat",
      clothingImgAlt: "white winter hat",
    },
  ]);

  return (
    <>
      <div id="hero">
        <Hero />
        <LogoBanner logoImgList={[gucciImg]} />
        <div className="hero-new-arrival">
          <ClothingFeature
            clothingCarouselDetailsArray={newClothesCarouselList}
            clothingFeatHeader={"NEW CLOTHES"}
            clothingFeatButtonText={"View All"}
          />
        </div>
        <hr />
        <div className="hero-top-selling">
          <ClothingFeature
            clothingCarouselDetailsArray={topClothesCarouselList}
            clothingFeatHeader={"TOP SELLING"}
            clothingFeatButtonText={"View All"}
          />
        </div>
      </div>
    </>
  );
}
export default Home;

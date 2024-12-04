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
import { BackendClothingItemSummaryModel } from "../../../../models/ClothingModels";

// Top Clothes Images
import clothingImg4 from "../../../../assets/Top Clothes/yellow-winter-hat-png.png";
import clothingImg5 from "../../../../assets/Top Clothes/pink-gloves-png.png";
import clothingImg6 from "../../../../assets/Top Clothes/white-winter-hat-png.png";
import CustomerReviewCarousel from "../../../templates/Carousels/CustomerReviewCarousel/CustomerReviewCarousel";

function Home() {
  const [newClothesCarouselList] = useState<BackendClothingItemSummaryModel[]>([
    {
      id: 1,
      imgUrl: clothingImg1,
      name: "Blue Pants",
      price: 208,
      imgAltText: "blue pants",
    },
    {
      id: 2,
      imgUrl: clothingImg2,
      name: "Sneakers",
      price: 120,
      imgAltText: "sneakers",
    },
    {
      id: 3,
      imgUrl: clothingImg3,
      name: "Green Pants",
      price: 180,
      imgAltText: "green pants",
    },
  ]);

  const [topClothesCarouselList] = useState<BackendClothingItemSummaryModel[]>([
    {
      id: 4,
      imgUrl: clothingImg4,
      price: 300,
      name: "Blue Fedora",
      imgAltText: "blue fedora",
    },
    {
      id: 5,
      imgUrl: clothingImg5,
      price: 250,
      name: "Pink Gloves",
      imgAltText: "pink gloves",
    },
    {
      id: 6,
      imgUrl: clothingImg6,
      price: 500,
      name: "White Winter Hat",
      imgAltText: "white winter hat",
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
        <div className="hero-top-clothing">
          <ClothingFeature
            clothingCarouselDetailsArray={topClothesCarouselList}
            clothingFeatHeader={"TOP CLOTHING"}
            clothingFeatButtonText={"View All"}
          />
        </div>
        <div className="hero-cutomer-reveiw-carousel">
          <CustomerReviewCarousel
            reviewDetailsArray={[
              {
                customerName: "Jeff",
                customerReviewBody: "I like the platform and the clothes",
              },
              {
                customerName: "Anna",
                customerReviewBody: "The gloves I ordred arrived right on time",
              },
              {
                customerName: "Jeff",
                customerReviewBody: "I like the platform and the clothes",
              },
              {
                customerName: "Anna",
                customerReviewBody: "The gloves I ordred arrived right on time",
              },
              {
                customerName: "Jeff",
                customerReviewBody: "I like the platform and the clothes",
              },
              {
                customerName: "Anna",
                customerReviewBody: "The gloves I ordred arrived right on time",
              },
              {
                customerName: "Jeff",
                customerReviewBody: "I like the platform and the clothes",
              },
              {
                customerName: "Anna",
                customerReviewBody: "The gloves I ordred arrived right on time",
              },
              {
                customerName: "Jeff",
                customerReviewBody: "I like the platform and the clothes",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
export default Home;

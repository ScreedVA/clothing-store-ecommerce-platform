import LogoBanner from "../../../templates/LogoBanner/LogoBanner";
import "./Home.css";
import Hero from "./pages/Hero/Hero";
import gucciImg from "../../../../assets/Gucci-Fragrances-webp-file.webp";
import ClothingFeature from "../../../templates/ClothingFeature/ClothingFeature";

// New Clothes Images
import clothingImg1 from "../../../../../src/assets/New Arrivals/pants-2-png.png";
import clothingImg2 from "../../../../../src/assets/New Arrivals/sneaker-shoe-png.png";
import clothingImg3 from "../../../../../src/assets/New Arrivals/pants-png.png";
import { useEffect, useState } from "react";
import { BackendClothingItemSummaryModel, FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";

// Top Clothes Images
import clothingImg4 from "../../../../assets/Top Clothes/yellow-winter-hat-png.png";
import clothingImg5 from "../../../../assets/Top Clothes/pink-gloves-png.png";
import clothingImg6 from "../../../../assets/Top Clothes/white-winter-hat-png.png";
import CustomerReviewCarousel from "../../../templates/Carousels/CustomerReviewCarousel/CustomerReviewCarousel";
import { GETClothingItemSummaryList } from "../../../../services/http/ClothingService";
import { BackendClothingFilterModel } from "../../../../models/FilterModels";

function Home() {
  const [newClothesFilter, setNewClothesFilter] = useState<BackendClothingFilterModel>({
    page: 1,
    pageSize: 3,
  });
  async function initNewClothesCarouselList() {
    const clothingItemSummaryResponse: FrontendClothingItemSummaryModel[] = await GETClothingItemSummaryList(
      newClothesFilter
    );
    setNewClothesCarouselList(clothingItemSummaryResponse);
  }
  const [newClothesCarouselList, setNewClothesCarouselList] = useState<FrontendClothingItemSummaryModel[]>();

  const [topClothesFilter, setTopClothesFilter] = useState<BackendClothingFilterModel>({
    page: 1,
    pageSize: 3,
  });
  async function initTopClothesCarouselList() {
    const clothingItemSummaryResponse: FrontendClothingItemSummaryModel[] = await GETClothingItemSummaryList(
      topClothesFilter
    );
    setTopClothesCarouselList(clothingItemSummaryResponse);
  }
  const [topClothesCarouselList, setTopClothesCarouselList] = useState<FrontendClothingItemSummaryModel[]>();

  useEffect(() => {
    initNewClothesCarouselList(), initTopClothesCarouselList();
  }, []);
  return (
    <>
      <div id="hero">
        <Hero />
        <LogoBanner logoImgList={[gucciImg]} />
        <div className="hero-new-arrival">
          {newClothesCarouselList && (
            <ClothingFeature
              clothingCarouselDetailsArray={newClothesCarouselList}
              clothingFeatHeader={"NEW CLOTHES"}
              clothingFeatButtonText={"View All"}
            />
          )}
        </div>
        <hr />
        <div className="hero-top-clothing">
          {topClothesCarouselList && (
            <ClothingFeature
              clothingCarouselDetailsArray={topClothesCarouselList}
              clothingFeatHeader={"TOP CLOTHING"}
              clothingFeatButtonText={"View All"}
            />
          )}
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

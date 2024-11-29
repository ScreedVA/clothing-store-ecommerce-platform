import "./ClothingFeature.css";
import { useState } from "react";

import ClothingCarousel from "../Carousels/ClothingCarousel/ClothingCarousel";
import Button from "../Button/Button";
import { ClothingCarouselDetails } from "../../../models/CarouselModels";

interface ClothingFeatureProps {
  clothingFeatHeader: string;
  clothingFeatButtonText: string;
  clothingCarouselDetailsArray: ClothingCarouselDetails[];
}

const ClothingFeature: React.FC<ClothingFeatureProps> = ({
  clothingFeatButtonText,
  clothingFeatHeader,
  clothingCarouselDetailsArray,
}) => {
  return (
    <>
      <div className="clothing-feat-container">
        <h1 className="clothing-feat-header">{clothingFeatHeader}</h1>
        <div className="clothing-feat-carousel">
          <ClothingCarousel carouselDetailsArray={clothingCarouselDetailsArray} />
        </div>
        <div className="clothing-feat-btn">
          <Button btnText={clothingFeatButtonText} />
        </div>
      </div>
    </>
  );
};
export default ClothingFeature;

import "./ClothingFeature.css";

import ClothingCarousel from "../Carousels/ClothingCarousel/ClothingCarousel";
import Button from "../Button/Button";
import { FrontendClothingItemSummaryModel } from "../../../models/ClothingModels";

interface ClothingFeatureProps {
  clothingFeatHeader: string;
  clothingFeatButtonText: string;
  clothingCarouselDetailsArray: FrontendClothingItemSummaryModel[];
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
          <Button btnText={clothingFeatButtonText} btnBorder={"1px solid black"} />
        </div>
      </div>
    </>
  );
};
export default ClothingFeature;

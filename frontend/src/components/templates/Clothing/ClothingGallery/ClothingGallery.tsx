import { FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";
import ClothingItemSummary from "../ClothingItemSummary/ClothingItemSummary";
import "./ClothingGallery.css";

interface ClothingGalleryProps {
  clothinglist: FrontendClothingItemSummaryModel[];
}

const ClothingGallery: React.FC<ClothingGalleryProps> = ({ clothinglist }) => {
  return (
    <>
      <div className="clothing-gallery-wrapper">
        <div className="clothing-gallery-container">
          {clothinglist.map((clothingItem, index) => (
            <div key={index}>
              <ClothingItemSummary {...clothingItem} onItemClick={() => console.log(clothingItem.name)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ClothingGallery;

import { ClothingItemSummaryConfig } from "../../../../models/CarouselModels";
import ClothingItemSummary from "../ClothingItemSummary/ClothingItemSummary";
import "./ClothingGallery.css";

interface ClothingGalleryProps {
  clothinglist: ClothingItemSummaryConfig[];
}

const ClothingGallery: React.FC<ClothingGalleryProps> = ({ clothinglist }) => {
  return (
    <>
      <div className="clothing-gallery-wrapper">
        <div className="clothing-gallery-container">
          {clothinglist.map((clothingItem, index) => (
            <div key={index}>
              <ClothingItemSummary {...clothingItem} onItemClick={() => console.log(clothingItem.clothingTitle)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ClothingGallery;

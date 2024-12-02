import { ClothingItemSummaryConfig } from "../../../../models/CarouselModels";
import "./ClothingItemSummary.css";
interface ClothingItemSummaryProps extends ClothingItemSummaryConfig {
  onItemClick?: () => void;
}

const ClothingItemSummary: React.FC<ClothingItemSummaryProps> = ({
  clothingImgPath,
  clothingPrice,
  clothingTitle,
  clothingImgAlt,
  onItemClick,
}) => {
  return (
    <>
      <div className="clothing-item-container" style={{ margin: "1%", perspective: "1000px" }}>
        <div
          className="clothing-img-container"
          style={{ marginBottom: "2%", backgroundColor: "#b2beb5", borderRadius: "10px" }}
        >
          <a onClick={onItemClick || undefined}>
            <img
              src={clothingImgPath}
              alt={`${clothingImgAlt}`}
              className="clothing-image"
              style={{ width: "100%", cursor: "pointer", transition: "transform 0.4s ease" }}
            />
          </a>
        </div>

        <p className="clothing-title">{clothingTitle}</p>
        <p className="clothing-price">
          <span>${clothingPrice}</span>
        </p>
      </div>
    </>
  );
};
export default ClothingItemSummary;

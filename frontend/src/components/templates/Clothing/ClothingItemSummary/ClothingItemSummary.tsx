import { FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";
import RatingStars from "../../RatingStar/RatingStars";
import "./ClothingItemSummary.css";
interface ClothingItemSummaryProps extends FrontendClothingItemSummaryModel {
  onItemClick?: () => void;
}

const ClothingItemSummary: React.FC<ClothingItemSummaryProps> = ({
  primaryImgData,
  name,
  price,
  rating,
  imgAltText,
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
            {primaryImgData && (
              <img
                src={URL.createObjectURL(primaryImgData)}
                alt={`${imgAltText}`}
                className="clothing-image"
                style={{ width: "100%", cursor: "pointer", transition: "transform 0.4s ease" }}
              />
            )}
          </a>
        </div>

        <RatingStars rating={rating} />
        <p className="clothing-title">{name}</p>
        <p className="clothing-price">
          <span>${price}</span>
        </p>
      </div>
    </>
  );
};
export default ClothingItemSummary;

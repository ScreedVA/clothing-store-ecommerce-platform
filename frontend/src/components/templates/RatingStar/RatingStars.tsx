import "./RatingStars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
interface RatingStarsPops {
  rating: number;
  outOf?: number;
}

const RatingStars: React.FC<RatingStarsPops> = ({ rating, outOf = 5 }) => {
  const stars = [];

  for (let i = 1; i <= outOf; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{ color: "gold" }} />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: "gold" }} />);
    } else {
      // Empty star
      stars.push(<FontAwesomeIcon key={i} icon={emptyStar} style={{ color: "lightgray" }} />);
    }
  }
  return (
    <>
      <div className="rating-star-container" style={{ display: "flex", alignItems: "center" }}>
        {stars}
      </div>
    </>
  );
};
export default RatingStars;

import "./ReactImgCarousel.css";
import "swiper/swiper-bundle.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImgCarouselModel } from "../../../../models/CarouselModels";

interface ImgCarouselProps {
  imageArray: ImgCarouselModel[];
  autoPlay?: boolean;
}

const ImgCarousel: React.FC<ImgCarouselProps> = ({ imageArray, autoPlay = false }) => {
  return (
    <div className="imgcarousel-wrapper" style={{ height: "500px" /* Match hero height */ }}>
      <ReactImageGallery
        items={imageArray}
        autoPlay={autoPlay}
        showThumbnails={false}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        slideDuration={2000}
        slideInterval={3000}
      />
    </div>
  );
};
export default ImgCarousel;

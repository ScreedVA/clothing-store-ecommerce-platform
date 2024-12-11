import "./ClothingCarousel.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";
import ClothingItemSummary from "../../Clothing/ClothingItemSummary/ClothingItemSummary";
interface ClothingCarouselProps {
  carouselDetailsArray: FrontendClothingItemSummaryModel[];
}

const ClothingCarousel: React.FC<ClothingCarouselProps> = ({ carouselDetailsArray }) => {
  return (
    <>
      <div className="clothing-carousel-container">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          autoplay={{ delay: 3000 }}
          navigation={true}
          modules={[Navigation]}
          className="clothing-carousel-swiper-container"
        >
          {carouselDetailsArray.map((clothingItem, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <ClothingItemSummary {...clothingItem} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default ClothingCarousel;

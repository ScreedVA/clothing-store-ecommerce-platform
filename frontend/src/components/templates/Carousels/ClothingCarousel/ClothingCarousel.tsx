import "./ClothingCarousel.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ClothingCarouselDetails } from "../../../../models/CarouselModels";
interface ClothingCarouselProps {
  carouselDetailsArray: ClothingCarouselDetails[];
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
          {carouselDetailsArray.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="slide-item-container">
                <div className="clothing-img-container slide-img-frag ">
                  <img src={item.clothingImgPath} alt={`Slide ${index}`} className="slide-item-frag" />
                </div>
                <p className="clothing-title slide-item-frag">{item.clothingTitle}</p>
                <p className="clothing-price slide-item-frag">
                  <span>${item.clothingPrice}</span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default ClothingCarousel;

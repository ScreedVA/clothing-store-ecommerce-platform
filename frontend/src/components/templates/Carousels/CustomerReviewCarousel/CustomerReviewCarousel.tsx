import "./CustomerReviewCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CustomerReviewDetails } from "../../../../models/CarouselModels";
import { useEffect, useRef, useState } from "react";
interface CustomerReviewCarouselProps {
  reviewDetailsArray: CustomerReviewDetails[];
}

const CustomerReviewCarousel: React.FC<CustomerReviewCarouselProps> = ({ reviewDetailsArray }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  let slidesPerView = vwWidth > 1500 ? 5 : 3; // Adjust this value as needed

  // Calculate the center slide index relative to activeIndex
  const getCenterIndex = (index: any) => {
    const centerOffset = Math.floor(slidesPerView / 2);
    const totalSlides = reviewDetailsArray.length;
    const centerIndex = (index + centerOffset) % totalSlides;
    if (slidesPerView === 3) {
      return [centerIndex]; // Wrap around in looped mode
    } else {
      return [centerIndex - 1, centerIndex, centerIndex + 1];
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setVwWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="customer-review-container">
        <div className="customer-review-header">
          <h2 className="customer-review-header-h2">OUR HAPPY CUSTOMERS</h2>
          <span className="customer-review-header-button-span">
            <button className="custom-cr-button prev">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="custom-cr-button next">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </span>
        </div>
        <div className="customer-review-carousel">
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={10}
            autoplay={{ delay: 3000 }}
            navigation={{
              prevEl: ".custom-cr-button.prev",
              nextEl: ".custom-cr-button.next",
            }}
            modules={[Navigation]}
            className="customer-review-swiper-container"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation) {
                  // swiper.params.navigation.prevEl = prevRef.current;
                  // swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
          >
            {reviewDetailsArray.map((item, index) => {
              const isFocused = getCenterIndex(activeIndex).includes(index);
              return (
                <SwiperSlide key={index} className={`customer-review-slide ${!isFocused ? "blurred" : "focused"}`}>
                  <div className="customer-review-slide-item-container">
                    <h4 className="customer-review-slide-item-name">{item.customerName}</h4>
                    <p className="customer-review-slide-item-body">{item.customerReviewBody}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default CustomerReviewCarousel;

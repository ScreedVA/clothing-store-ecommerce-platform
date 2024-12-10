import { ImgCarouselModel } from "../../../../../../models/CarouselModels";
import { StatBlockModels } from "../../../../../../models/StatBlockModels";
import Button from "../../../../../templates/Button/Button";
import StatBlock from "../../../../../templates/StatBlock/StatBlock";
import img1 from "../../../../../../assets/Barbara Palvin fashion model Supermodel_2.png";
import img2 from "../../../../../../assets/man_model_1.png";
import img3 from "../../../../../../assets/fashion-model-bijin-fashion-beauty-model.png";
import "./Hero.css";
import ReactImgCarousel from "../../../../../templates/Carousels/ReactImgCarousel/ReactImgCarousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const statBlockList: StatBlockModels[] = [
  { quantity: 300, title: "International Brands" },
  { quantity: 1500, title: "High-Quality Products" },
  { quantity: 3000, title: "Happy Customers" },
];
const imgCarouselModelList: ImgCarouselModel[] = [{ original: img1 }, { original: img2 }, { original: img3 }];

function Hero() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Delay of 1000ms (1 second)

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      <div className="hero-container">
        <>
          <div className="hero-left">
            <h1>FIND CLOTHES THAT MATCHTES YOUR STYLE</h1>
            <p>
              Browse through our diverse range of meticulously crafted garments, designed to bring out your
              individuality and cater to your sense of style
            </p>
            <div className="hero-left-button">
              <Button
                btnText={"Shop Now"}
                btnBorder="1px solid black"
                btnOnClick={() => navigate("/shop")}
                // btnWidth="100%"
              />
            </div>
            <div className="hero-left-statblock">
              <StatBlock statBlockList={statBlockList} />
            </div>
          </div>
          <div className="hero-right">
            <ReactImgCarousel imageArray={imgCarouselModelList} autoPlay={true} />
          </div>
        </>
      </div>
    </>
  );
}
export default Hero;

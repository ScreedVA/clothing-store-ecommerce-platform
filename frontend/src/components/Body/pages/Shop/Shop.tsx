import "./Shop.css";
import { useEffect, useState } from "react";
import SideBarFilter from "../../../templates/Filters/SideBarFilter/SideBarFilter";
import { OptionsSelectorConfig } from "../../../../models/FilterModels";
import { ClothingItemSummaryConfig } from "../../../../models/CarouselModels";

import img1 from "../../../../assets/Clothing Gallery/black_latex_gloves.png";
import img2 from "../../../../assets/Clothing Gallery/brown_latex_gloves.png";
import img3 from "../../../../assets/Clothing Gallery/colorful_jacket.png";
import img4 from "../../../../assets/Clothing Gallery/colorful_jacket_2.png";
import img5 from "../../../../assets/Clothing Gallery/gray_jeans.png";
import img6 from "../../../../assets/Clothing Gallery/gray_pants_2.png";
import img7 from "../../../../assets/Clothing Gallery/gray_socks.png";
import img8 from "../../../../assets/Clothing Gallery/white_shirt_coat.png";
import img9 from "../../../../assets/Clothing Gallery/white_socks.png";

import ClothingGallery from "../../../templates/Clothing/ClothingGallery/ClothingGallery";

function Shop() {
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  let isMobile = vwWidth <= 1400;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState();
  const [clothingGalleryList] = useState<ClothingItemSummaryConfig[]>([
    {
      clothingImgPath: img1,
      clothingPrice: 300,
      clothingTitle: "Black Latex Gloves",
      clothingImgAlt: "Black Latex Gloves",
    },
    {
      clothingImgPath: img2,
      clothingPrice: 300,
      clothingTitle: "Brown Latex Gloves",
      clothingImgAlt: "Brown Latex Gloves",
    },
    {
      clothingImgPath: img3,
      clothingPrice: 300,
      clothingTitle: "Colorful Jacket",
      clothingImgAlt: "Colorful Jacket",
    },
    {
      clothingImgPath: img4,
      clothingPrice: 300,
      clothingTitle: "Colorful Jacket 2",
      clothingImgAlt: "Colorful Jacket 2",
    },
    {
      clothingImgPath: img5,
      clothingPrice: 300,
      clothingTitle: "Jeans",
      clothingImgAlt: "Jeans",
    },
    {
      clothingImgPath: img6,
      clothingPrice: 300,
      clothingTitle: "Jeans 2",
      clothingImgAlt: "Jeans 2",
    },
    {
      clothingImgPath: img7,
      clothingPrice: 300,
      clothingTitle: "Gray Socks",
      clothingImgAlt: "Grey Socks",
    },
    {
      clothingImgPath: img8,
      clothingPrice: 300,
      clothingTitle: "White Shirt",
      clothingImgAlt: "White Shirt",
    },
    {
      clothingImgPath: img9,
      clothingPrice: 300,
      clothingTitle: "White Socks",
      clothingImgAlt: "White Socks",
    },
  ]);

  const handleResize = () => {
    setVwWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="shop-wrapper">
        <div className="shop-container">
          {!isMobile ? (
            <div className="left">
              <div className="filter-container">
                <SideBarFilter
                  sendFilter={setFilter}
                  priceSliderConfig={{ priceLowerLimit: 0, priceUpperLimit: 200 }}
                />
              </div>
            </div>
          ) : (
            <div
              className={`left ${showFilter ? "active" : ""}`}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setShowFilter(false);
                }
              }}
            >
              <div className="filter-container">
                <SideBarFilter
                  sendFilter={setFilter}
                  priceSliderConfig={{ priceLowerLimit: 0, priceUpperLimit: 200 }}
                />
              </div>
            </div>
          )}
          <div className="right">
            <h3>Clothes</h3>
            <span
              className="gallery-subheading"
              style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px" }}
            >
              <p>Showing 1-10 of 100 Products</p>

              {/* Configure filter button when screen isMobile */}
              {isMobile && (
                <i
                  onClick={() => setShowFilter((prevValue) => !prevValue)}
                  className="fa-solid fa-filter gallery-filter-btn"
                ></i>
              )}
            </span>
            <ClothingGallery clothinglist={clothingGalleryList} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;

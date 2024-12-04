import "./Shop.css";
import { useEffect, useState } from "react";
import SideBarFilter from "../../../templates/Filters/SideBarFilter/SideBarFilter";
import {
  BackendClothingFilterModel,
  ClothingFilterConfig,
  OptionsSelectorConfig,
} from "../../../../models/FilterModels";
import { FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";

import ClothingGallery from "../../../templates/Clothing/ClothingGallery/ClothingGallery";
import { GETClothingItemSummaryList } from "../../../../services/http/ClothingService";
import { EnumCLothingSizeVarations } from "../../../../enumeration/ClothingEnums";

function Shop() {
  const [clothingGalleryList, setClothingGalleryList] = useState<FrontendClothingItemSummaryModel[]>();
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  let isMobile = vwWidth <= 1400;

  // Init Side bar filter
  const [filter, setFilter] = useState<BackendClothingFilterModel>({
    priceRange: { min: 0, max: 500 },
    sizeSelector: EnumCLothingSizeVarations.SMALL,
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterConfig] = useState<ClothingFilterConfig>({
    priceSliderConfig: {
      min: 0,
      max: 500,
    },
    sizeSelectorConfigArray: Object.values(EnumCLothingSizeVarations).map((value) => ({
      innerText: value,
      value: value,
    })),
  });

  const handleResize = () => {
    setVwWidth(window.innerWidth);
  };

  async function initClothingItemSummaryModel() {
    const frontendClothingItemListResData: FrontendClothingItemSummaryModel[] = await GETClothingItemSummaryList();

    setClothingGalleryList(frontendClothingItemListResData);
  }

  useEffect(() => {
    // Initialize CLothing Gallery List
    initClothingItemSummaryModel();

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
            // Desktop Shop View
            <div className="left">
              <div className="filter-container">
                <SideBarFilter filter={filter} sendFilter={setFilter} {...filterConfig} />
              </div>
            </div>
          ) : (
            // Mobile Shop View
            <div
              className={`left ${showFilter ? "active" : ""}`}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setShowFilter(false);
                }
              }}
            >
              <div className="filter-container">
                <SideBarFilter filter={filter} sendFilter={setFilter} {...filterConfig} />
              </div>
            </div>
          )}

          <div className="right">
            <h3>Clothes</h3>
            <span className="gallery-subheading" style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Showing 1-10 of 100 Products</p>

              {/* Mobile Filter Toggle Button */}
              {isMobile && (
                <i
                  onClick={() => setShowFilter((prevValue) => !prevValue)}
                  className="fa-solid fa-filter gallery-filter-btn"
                ></i>
              )}
            </span>
            {clothingGalleryList && <ClothingGallery clothinglist={clothingGalleryList} />}
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;

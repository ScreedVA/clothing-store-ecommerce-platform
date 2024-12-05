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
import {
  GETClothingItemSummaryHighestPrice,
  GETClothingItemSummaryList,
} from "../../../../services/http/ClothingService";
import { EnumClothingColorVariations, EnumCLothingSizeVarations } from "../../../../enumeration/ClothingEnums";

function Shop() {
  const [clothingGalleryList, setClothingGalleryList] = useState<FrontendClothingItemSummaryModel[]>();
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  let isMobile = vwWidth <= 1400;

  // Init Side bar filter
  async function initHighestItemPrice() {
    const response = await GETClothingItemSummaryHighestPrice();
    const resData: FrontendClothingItemSummaryModel = await response.json();
    const highestPrice: number = resData.price;

    setFilter((prevFilter: any) => ({
      ...prevFilter,
      priceRange: { ...prevFilter.priceRange, max: highestPrice },
    }));
  }
  useEffect(() => {
    initHighestItemPrice();
  }, []);
  const [filter, setFilter] = useState<BackendClothingFilterModel>({
    page: 1,
    pageSize: 6,
    priceRange: { min: 0, max: 500 },
    sizeSelector: EnumCLothingSizeVarations.SMALL,
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterConfig] = useState<ClothingFilterConfig>({
    priceSliderConfig: {
      min: 0,
      max: 500,
    },
    sizeSelectorConfigArray: Object.values(EnumCLothingSizeVarations).map((enumValue) => ({
      value: enumValue,
    })),
    colorSelectorConfigArray: Object.values(EnumClothingColorVariations).map((enumValue) => ({
      value: enumValue,
      color: enumValue,
    })),
  });

  function updateFilter(newFilter: BackendClothingFilterModel) {
    setFilter({ ...newFilter });
  }

  const handleResize = () => {
    setVwWidth(window.innerWidth);
  };

  async function initClothingItemSummaryModel(backendFilter: BackendClothingFilterModel | undefined) {
    const frontendClothingItemListResData: FrontendClothingItemSummaryModel[] = await GETClothingItemSummaryList(
      backendFilter
    );

    setClothingGalleryList(frontendClothingItemListResData);
  }

  async function applyFilter() {
    await initClothingItemSummaryModel(filter);
  }

  useEffect(() => {
    // Initialize CLothing Gallery List
    initClothingItemSummaryModel(undefined);

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
                <SideBarFilter
                  applyFilter={applyFilter}
                  filter={filter}
                  updateFilter={updateFilter}
                  {...filterConfig}
                />
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
                <SideBarFilter
                  applyFilter={applyFilter}
                  filter={filter}
                  updateFilter={updateFilter}
                  {...filterConfig}
                />
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
            <div className="shop-clothing-gallery-container">
              {clothingGalleryList && <ClothingGallery clothinglist={clothingGalleryList} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;

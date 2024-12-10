import "./Shop.css";
import { useEffect, useState } from "react";
import SideBarFilter from "../../../templates/Filters/SideBarFilter/SideBarFilter";
import {
  BackendClothingFilterModel,
  ClothingFilterConfig,
  FilterResponsePageDetails,
} from "../../../../models/FilterModels";
import { FrontendClothingItemSummaryModel } from "../../../../models/ClothingModels";

import ClothingGallery from "../../../templates/Clothing/ClothingGallery/ClothingGallery";
import {
  GETClothingItemSummaryHighestPrice,
  GETClothingItemSummaryList,
  GETPageConfigDetails,
} from "../../../../services/http/ClothingService";
import { EnumClothingColorVariations, EnumCLothingSizeVarations } from "../../../../enumeration/ClothingEnums";
import PageSelector from "../../../templates/Filters/PageSelector/PageSelector";

function Shop() {
  // Init Clothing Item Gallary
  const [clothingGalleryList, setClothingGalleryList] = useState<FrontendClothingItemSummaryModel[]>();
  async function initClothingItemSummaryModel(backendFilter: BackendClothingFilterModel | undefined) {
    // Initialize Page Configuration
    const pageResponse: Response = await GETPageConfigDetails(backendFilter);
    const pageDetails: FilterResponsePageDetails = await pageResponse.json();
    setPageDetails(pageDetails);

    // Initialize Clothing Items
    const frontendClothingItemListResData: FrontendClothingItemSummaryModel[] = await GETClothingItemSummaryList(
      backendFilter
    );
    setClothingGalleryList(frontendClothingItemListResData);
  }

  // Init vhWidth tracking
  const [vwWidth, setVwWidth] = useState(window.innerWidth);
  let isMobile = vwWidth <= 1400;
  const handleResize = () => {
    setVwWidth(window.innerWidth);
  };

  // Init side-bar filter
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
  async function updateFilter(newFilter: BackendClothingFilterModel) {
    await setFilter({ ...newFilter });
    console.log(filter);
  }
  async function applyFilter() {
    await initClothingItemSummaryModel(filter);
    setPage(1);
  }

  // Init Page configuration
  const [page, setPage] = useState<number>(1);
  const [pageDetails, setPageDetails] = useState<FilterResponsePageDetails>();
  useEffect(() => {
    const updatedFilter: BackendClothingFilterModel = { ...filter, page: page };
    if (updatedFilter.page !== filter.page) {
      setFilter(updatedFilter);
      initClothingItemSummaryModel(updatedFilter);
    }
  }, [page, filter]);

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
            <div className="right-top">
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
                {clothingGalleryList ? (
                  <ClothingGallery clothinglist={clothingGalleryList} />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    No Clothes
                  </div>
                )}
              </div>
            </div>
            <div className="shop-page-selector">
              {pageDetails && (
                <PageSelector totalPages={pageDetails.total_pages} currentPage={page} updatePage={setPage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;

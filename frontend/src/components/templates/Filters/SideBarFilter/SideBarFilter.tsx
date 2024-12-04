import { useEffect, useState } from "react";
import { BackendClothingFilterModel, OptionsSelectorConfig, PriceSliderConfig } from "../../../../models/FilterModels";
import OptionsSelector from "../OptionSelector/OptionsSelector";
import PriceSlider from "../PriceSlider/PriceSlider";
import "./SideBarFilter.css";
import Button from "../../Button/Button";
import { ButtonConfigModel } from "../../../../models/ButtonModels";

interface SideBarFilterProps {
  priceSliderConfig: PriceSliderConfig;
  sizeSelectorConfigArray: OptionsSelectorConfig[];
  filter: BackendClothingFilterModel;
  sendFilter: (prevValues: any) => void;
}

const SideBarFilter: React.FC<SideBarFilterProps> = ({
  priceSliderConfig,
  sizeSelectorConfigArray,
  filter,
  sendFilter,
}) => {
  // Price Slider Configuration
  const [filterPriceSliderConfig] = useState<PriceSliderConfig>(priceSliderConfig);
  const [priceSliderValues, setPriceSliderValues] = useState([
    filterPriceSliderConfig.max * 0.25,
    filterPriceSliderConfig.max * 0.75,
  ]);

  // Size Selector Configuration
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  // Button Configuration
  const [filterBtnConfiguration] = useState<ButtonConfigModel>({
    btnText: "Apply Filter",
    btnWidth: "100%",
  });

  // Filter Initialization
  async function handleFilter() {
    await sendFilter((prevFilter: BackendClothingFilterModel) => {
      return {
        ...prevFilter,
        priceRange: { min: priceSliderValues[0], max: priceSliderValues[1] },
        sizeSelector: sizeSelectorConfigArray[selectedSizeIndex],
      };
    });
    console.log(filter);
  }

  useEffect(() => {
    handleFilter();
  }, [priceSliderValues, selectedSizeIndex]);

  return (
    <>
      <div className="sidebar-filter-container">
        <div className="side-bar-heading">
          <h4>Filters</h4>
          <hr />
        </div>
        <form className="side-bar-filter">
          <div className="price-slider">
            <PriceSlider
              {...filterPriceSliderConfig}
              heading={"Price"}
              values={priceSliderValues}
              setValues={setPriceSliderValues}
            />
          </div>
          <hr />
          <h4 style={{ margin: "10px 0px" }}>Size</h4>
          <div className="size-selector">
            <OptionsSelector
              optionSelectorConfigList={sizeSelectorConfigArray}
              selectedIndex={selectedSizeIndex}
              updateSelctionIndex={setSelectedSizeIndex}
            />
          </div>
          <div className="filter-button" style={{ margin: "20px 0px" }}>
            <Button {...filterBtnConfiguration} />
          </div>
        </form>
      </div>
    </>
  );
};
export default SideBarFilter;

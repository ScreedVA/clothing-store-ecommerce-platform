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
  colorSelectorConfigArray: OptionsSelectorConfig[];
  filter: BackendClothingFilterModel;
  updateFilter: (prevValues: any) => void;
  applyFilter: () => void;
}

const SideBarFilter: React.FC<SideBarFilterProps> = ({
  priceSliderConfig,
  sizeSelectorConfigArray,
  colorSelectorConfigArray,
  filter,
  updateFilter,
  applyFilter,
}) => {
  // Price Slider Configuration
  const [filterPriceSliderConfig] = useState<PriceSliderConfig>(priceSliderConfig);
  const [priceSliderValues, setPriceSliderValues] = useState([0, filterPriceSliderConfig.max * 0.75]);

  // Size Selector Configuration
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  // Color Selector Configuration
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // Button Configuration
  const [filterBtnConfiguration] = useState<ButtonConfigModel>({
    btnText: "Apply Filter",
    btnType: "button",
    btnWidth: "100%",
  });

  // Filter Initialization
  async function handleFilterChange() {
    const updatedFilter = {
      ...filter,
      priceRange: { min: priceSliderValues[0], max: priceSliderValues[1] },
      sizeSelector: sizeSelectorConfigArray[selectedSizeIndex],
      colorSelector: colorSelectorConfigArray[selectedColorIndex],
    };

    updateFilter(updatedFilter);
  }

  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);

  useEffect(() => {
    handleFilterChange();
  }, [priceSliderValues, selectedSizeIndex, selectedColorIndex]);

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

          <hr />
          <h4 style={{ margin: "10px 0px" }}>Color</h4>
          <div className="color-selector">
            <OptionsSelector
              optionSelectorConfigList={colorSelectorConfigArray}
              selectedIndex={selectedColorIndex}
              updateSelctionIndex={setSelectedColorIndex}
              colorSelector={true}
              btnSelector={false}
            />
          </div>
          <div className="filter-button" style={{ margin: "20px 0px" }}>
            <Button {...filterBtnConfiguration} btnOnClick={() => applyFilter()} />
          </div>
        </form>
      </div>
    </>
  );
};
export default SideBarFilter;

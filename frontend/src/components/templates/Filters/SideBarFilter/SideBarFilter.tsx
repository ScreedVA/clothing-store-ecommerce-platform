import { useState } from "react";
import { OptionsSelectorConfig, PriceSliderConfig } from "../../../../models/FilterModels";
import OptionsSelector from "../OptionSelector/OptionsSelector";
import PriceSlider from "../PriceSlider/PriceSlider";
import "./SideBarFilter.css";
import Button from "../../Button/Button";
import { ButtonConfigModel } from "../../../../models/ButtonModels";

interface SideBarFilterProps {
  priceSliderConfig?: PriceSliderConfig;
  sizeSelectorConfig?: OptionsSelectorConfig;
  sendFilter: (prevValues: any) => void;
}

const SideBarFilter: React.FC<SideBarFilterProps> = ({ priceSliderConfig, sizeSelectorConfig, sendFilter }) => {
  // Filter Price Slider Configuration
  const [filterPriceSliderConfig] = useState<PriceSliderConfig>(
    priceSliderConfig || { priceLowerLimit: 0, priceUpperLimit: 300 }
  );
  const [values, setValues] = useState([
    filterPriceSliderConfig.priceUpperLimit * 0.25,
    filterPriceSliderConfig.priceUpperLimit * 0.75,
  ]);

  // Size Selector Configuration
  const [sizeOptions] = useState<OptionsSelectorConfig>(
    sizeSelectorConfig || {
      optionList: [
        {
          innerText: "XX-Small",
          value: "XX-Small",
        },
        {
          innerText: "X-Small",
          value: "X-Small",
        },
        {
          innerText: "Small",
          value: "Small",
        },
        {
          innerText: "Medium",
          value: "Medium",
        },
        {
          innerText: "Large",
          value: "Large",
        },
        {
          innerText: "X-Large",
          value: "X-Large",
        },
        {
          innerText: "XX-Large",
          value: "XX-Large",
        },
        {
          innerText: "3X-Large",
          value: "4X-Large",
        },
      ],
    }
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  // Button Configuration
  const [filterBtnConfiguration] = useState<ButtonConfigModel>({
    btnText: "Apply Filter",
  });
  return (
    <>
      <div className="sidebar-filter-container">
        <div className="side-bar-heading">
          <h4>Filters</h4>
          <hr />
        </div>
        <form className="side-bar-filter">
          <div className="price-slider">
            <PriceSlider {...filterPriceSliderConfig} heading={"Price"} values={values} setValues={setValues} />
          </div>
          <hr />
          <h4 style={{ margin: "10px 0px" }}>Size</h4>
          <div className="size-selector">
            <OptionsSelector
              {...sizeOptions}
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

import { OptionsSelectorConfig } from "../../../../models/FilterModels";
import Button from "../../Button/Button";
import "./OptionsSelector.css";

interface OptionsSelectorProps {
  optionSelectorConfigList: OptionsSelectorConfig[];
  selectedIndex: number;
  updateSelctionIndex: (index: number) => void;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  optionSelectorConfigList,
  selectedIndex,
  updateSelctionIndex,
}) => {
  async function handleSelectionChange(index: number) {
    await updateSelctionIndex(index);
  }

  return (
    <>
      <div className="options-selector-wrapper">
        <div className="option-selector-container">
          {optionSelectorConfigList.map((option, index) => (
            <div key={index}>
              <Button
                {...{
                  btnText: option.innerText,
                  btnType: "button",
                  disableBackgroundContrastHover: true,
                  colorContrastConfig: { altColor: "black", baseColor: "white" },
                  btnWidth: "100%",
                  btnPadding: "10px 25px",
                  invertBackgroundColor: selectedIndex == index ? true : false,
                  btnTransition: "background-position 0.2s ease, color 0.2s ease",
                  btnOnClick: () => {
                    handleSelectionChange(index);
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OptionsSelector;

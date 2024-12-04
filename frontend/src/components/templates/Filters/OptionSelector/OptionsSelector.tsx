import { OptionsSelectorConfig } from "../../../../models/FilterModels";
import Button from "../../Button/Button";
import "./OptionsSelector.css";

interface OptionsSelectorProps {
  optionSelectorConfigList: OptionsSelectorConfig[];
  selectedIndex: number;
  updateSelctionIndex: (index: number) => void;
  btnSelector?: boolean;
  colorSelector?: boolean;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  optionSelectorConfigList,
  selectedIndex,
  updateSelctionIndex,
  btnSelector = true,
  colorSelector = false,
}) => {
  return (
    <>
      <div className="options-selector-wrapper">
        <div className="option-selector-container">
          {/* Inialize Button Selector */}
          {btnSelector && !colorSelector && (
            <>
              {optionSelectorConfigList.map((option, index) => (
                <div key={index}>
                  <Button
                    {...{
                      btnText: option.value,
                      btnType: "button",
                      disableBackgroundContrastHover: true,
                      colorContrastConfig: { altColor: "black", baseColor: "white" },
                      btnWidth: "100%",
                      btnPadding: "10px 25px",
                      invertBackgroundColor: selectedIndex == index ? true : false,
                      btnTransition: "none",
                      btnOnClick: () => {
                        updateSelctionIndex(index);
                      },
                    }}
                  />
                </div>
              ))}
            </>
          )}
          {/* Initialize Color Selector */}
          {colorSelector && !btnSelector && (
            <>
              <div className="color-selector-wrapper">
                {optionSelectorConfigList.map((option, index) => (
                  <div
                    key={`color-selector-${index}`}
                    onClick={() => {
                      updateSelctionIndex(index);
                    }}
                    className="color-selector"
                    style={{
                      ...{
                        borderRadius: "100%",
                        backgroundColor: "red",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      },
                      ...(option.color ? { backgroundColor: option.color } : {}),
                    }}
                  >
                    {selectedIndex == index && (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: option.color == "black" ? "white" : "black" }}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OptionsSelector;

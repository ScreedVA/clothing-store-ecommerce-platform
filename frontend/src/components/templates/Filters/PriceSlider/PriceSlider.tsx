import { PriceSliderConfig } from "../../../../models/FilterModels";
// import Slider, Range from "rc-slider";
import { Range } from "react-range";
interface PriceSliderProps extends PriceSliderConfig {
  heading?: string;
  values: number[];
  setValues: (prevValues: number[]) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ min, max, heading, setValues, values }) => {
  const STEP = 1;
  const MIN = min;
  const MAX = max;

  async function handleValueChange(values: number[]) {
    await setValues(values);
  }

  return (
    <>
      <h4>{heading}</h4>
      <div style={{ padding: "50px" }}>
        {/* <h3>Price</h3> */}
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(values) => handleValueChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              key={"price-slider-track"}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: `linear-gradient(to right, #ddd ${((values[0] - MIN) / (MAX - MIN)) * 100}%, black ${
                  ((values[0] - MIN) / (MAX - MIN)) * 100
                }%, black ${((values[1] - MIN) / (MAX - MIN)) * 100}%, #ddd ${
                  ((values[1] - MIN) / (MAX - MIN)) * 100
                }%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={`price-slider-thumb-${index}`}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            >
              <span style={{ position: "absolute", top: "-25px", color: "#000" }}>${values[index]}</span>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default PriceSlider;

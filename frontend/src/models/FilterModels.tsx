export interface PriceSliderConfig {
  priceLowerLimit: number;
  priceUpperLimit: number;
}

interface OptionsConfig {
  innerText: string;
  value: string;
}

export interface OptionsSelectorConfig {
  optionList: OptionsConfig[];
}

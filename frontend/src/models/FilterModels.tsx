import { EnumCLothingSizeVarations } from "../enumeration/ClothingEnums";

// Filter Configuration
export interface PriceSliderConfig {
  min: number;
  max: number;
}

export interface OptionsSelectorConfig {
  innerText: string;
  value: string;
}

export interface ClothingFilterConfig {
  sizeSelectorConfigArray: OptionsSelectorConfig[];
  priceSliderConfig: PriceSliderConfig;
}

// Backend Filters
export interface BackendClothingFilterModel {
  priceRange: PriceSliderConfig;
  sizeSelector: EnumCLothingSizeVarations;
}

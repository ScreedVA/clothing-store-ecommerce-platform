import { EnumClothingColorVariations, EnumCLothingSizeVarations } from "../enumeration/ClothingEnums";

// Filter Configuration
export interface PriceSliderConfig {
  min: number;
  max: number;
}

export interface OptionsSelectorConfig {
  value: string;
  color?: string;
}

export interface ClothingFilterConfig {
  sizeSelectorConfigArray: OptionsSelectorConfig[];
  colorSelectorConfigArray: OptionsSelectorConfig[];
  priceSliderConfig: PriceSliderConfig;
}

// Backend Filters
interface FilterBaseModel {
  page: number;
  pageSize: number;
}

export interface BackendClothingFilterModel extends FilterBaseModel {
  priceRange?: PriceSliderConfig;
  sizeSelector?: EnumCLothingSizeVarations;
  colorSelector?: EnumClothingColorVariations;
}

interface BaseClothingModel {
  id: number;
  name: string;
  price: number;
  imgAltText?: string;
  rating: number;
}

export interface BackendClothingItemSummaryModel extends BaseClothingModel {
  primaryImgId: number;
}

// Configuration Models
export interface FrontendClothingItemSummaryModel extends Omit<BackendClothingItemSummaryModel, "primaryImgId"> {
  primaryImgData?: Blob;
}

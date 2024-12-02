export interface ImgCarouselModel {
  original: string;
  textAlt?: string;
}

export interface ClothingItemSummaryConfig {
  clothingImgPath: string;
  clothingTitle: string;
  clothingPrice: number;
  clothingImgAlt?: string;
}

export interface CustomerReviewDetails {
  customerName: string;
  customerReviewBody: string;
}

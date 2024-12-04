import { BackendClothingItemSummaryModel, FrontendClothingItemSummaryModel } from "../../models/ClothingModels";
import { BackendClothingFilterModel } from "../../models/FilterModels";
import { API_BASE_DOMAIN } from "../CommonService";
import { getAccessToken } from "../StorageService";
import { handle401Exception } from "./AuthService";
import { GETImageFile } from "./FileService";

const API_BASE_URL: string = `${API_BASE_DOMAIN}/product/clothing`;

export async function GETClothingItemSummaryList(
  filter: BackendClothingFilterModel
): Promise<FrontendClothingItemSummaryModel[]> {
  // Configure Filters
  const params = new URLSearchParams();
  if (filter) {
    if (filter.priceRange) {
      filter.priceRange.min && params.append("min_price", String(filter.priceRange.min));
      filter.priceRange.max && params.append("max_price", String(filter.priceRange.max));
    }

    filter.colorSelector && params.append("color_selector", filter.colorSelector);
    filter.sizeSelector && params.append("size_selector", String(filter.sizeSelector));
  }

  const url: string = `${API_BASE_URL}/list?${params.toString()}`;
  // Handle Clothing Item Request
  let response: Response = await fetch(url, {
    method: "GET",
  });

  let backendResData: BackendClothingItemSummaryModel[] = await response.json();

  // Handle Primary Clothing Image Request
  let frontendResData: FrontendClothingItemSummaryModel[] = [];
  let imgResponse: Response;

  for (let backendClothingItem of backendResData) {
    let frontendClothingItem: FrontendClothingItemSummaryModel;
    if (backendClothingItem.primaryImgId) {
      imgResponse = await GETImageFile(backendClothingItem.primaryImgId);
      frontendClothingItem = { ...backendClothingItem, primaryImgData: await imgResponse.blob() };
    } else {
      frontendClothingItem = { ...backendClothingItem };
    }
    frontendResData.push(frontendClothingItem);
  }

  return frontendResData;
}

export async function GETClothingItemSummaryHighestPrice() {
  const response: Response = await fetch(`${API_BASE_URL}/price/max`, {
    method: "GET",
  });

  return response;
}

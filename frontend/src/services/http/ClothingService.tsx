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
    filter.priceRange && params.append("priceRange", JSON.stringify(filter.priceRange));
    filter.sizeSelector && params.append("sizeSelector", String(filter.sizeSelector));
  }

  const url: string = `${API_BASE_DOMAIN}/list?${params.toString()}`;
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

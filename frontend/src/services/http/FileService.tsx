import { API_BASE_DOMAIN } from "../CommonService";
const API_BASE_URL: string = `${API_BASE_DOMAIN}/file`;

export async function GETImageFile(imageId: number) {
  let response: Response = await fetch(`${API_BASE_URL}/image/${imageId}`, {
    method: "GET",
  });

  return response;
}

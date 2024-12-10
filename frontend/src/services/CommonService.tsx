<<<<<<< HEAD
const isProduction = window.location.hostname !== "localhost";

export const API_BASE_DOMAIN: string = isProduction
  ? "https://clothing-store-ecommerce-platform-backend.onrender.com"
  : "http://localhost:8000";
=======
export const API_BASE_DOMAIN: string = "http://localhost:8000";
>>>>>>> parent of a9910dc (fix/frontend-CommonService/updated environment variables)

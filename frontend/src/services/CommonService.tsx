import { env } from "process";

const EXTERNAL_DOMAIN: string = "https://clothing-store-ecommerce-platform-backend.onrender.com";

// Check if the app is running in production or development
const isProduction = window.location.hostname !== "localhost";
// Use the external domain in production, otherwise use localhost
export const API_BASE_DOMAIN: string = isProduction ? EXTERNAL_DOMAIN : "http://localhost:8000";

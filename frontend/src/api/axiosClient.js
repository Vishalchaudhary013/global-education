import axios from "axios";
import { attachInterceptors } from "./interceptors";

const productionApiUrl = "https://global-education-93mo.onrender.com/api";

/**
 * The single Axios instance used by every feature service.
 * Feature-specific endpoints belong in `features/<feature>/services`, not here.
 */
const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.PROD ? productionApiUrl : "http://localhost:4000/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

attachInterceptors(axiosClient);

export default axiosClient;

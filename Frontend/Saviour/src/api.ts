// Central API base URL — reads from VITE_API_URL env var, falls back to deployed Render backend
const API_URL = import.meta.env.VITE_API_URL || "https://saviour-web-project-1.onrender.com";

export default API_URL;


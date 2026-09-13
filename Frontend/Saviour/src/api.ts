// Central API base URL — reads from VITE_API_URL env var, falls back to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default API_URL;

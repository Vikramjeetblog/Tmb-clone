import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // ⬅ increase timeout to 15 seconds
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Auto retry function
const fetchWithRetry = async (url, params, retries = 3) => {
  try {
    const { data } = await api.get(url, { params });
    return data;
  } catch (err) {
    if (retries > 0) {
      console.warn(`Retrying TMDB request (${3 - retries + 1})...`);
      return fetchWithRetry(url, params, retries - 1);
    }

    console.error("TMDB API Error:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }

    return null;
  }
};

// Exported function
export const fetchDataFromApi = (url, params = {}) => {
  return fetchWithRetry(url, params);
};

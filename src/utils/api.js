const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "da58b03878c6e349442dcb55f029b1bc"; // TMDB API Key

// Native fetch with logging
const fetchTMDB = async (url, params = {}) => {
  console.log("%c[TMDB] Calling:", "color: #2196F3; font-weight: bold;", url);

  try {
    // Build full URL with API key
    const finalUrl = new URL(BASE_URL + url);
    finalUrl.searchParams.append("api_key", API_KEY);
    Object.keys(params).forEach((key) => {
      finalUrl.searchParams.append(key, params[key]);
    });

    console.log("%c[TMDB] Full URL:", "color: #03A9F4", finalUrl.toString());

    const response = await fetch(finalUrl, { method: "GET" });

    console.log("%c[TMDB] Status:", "color: purple", response.status);

    if (!response.ok) {
      console.error("%c[TMDB ERROR]:", "color: red", response.status);
      return null;
    }

    const data = await response.json();
    console.log("%c[TMDB] Success:", "color: #4CAF50", data);
    return data;

  } catch (err) {
    console.error("%c[TMDB FETCH ERROR]:", "color: red; font-weight: bold;", err.message);
    return null;
  }
};

// Retry wrapper with logs
export const fetchDataFromApi = async (url, params = {}, retries = 2) => {
  console.log("%c[TMDB] Fetch Attempt:", "color: #FFC107; font-weight: bold;", url);

  let result = await fetchTMDB(url, params);

  if (result) return result;

  if (retries > 0) {
    console.warn(
      `%c[TMDB] Retrying (${3 - retries + 1})...`,
      "color: orange; font-weight: bold;"
    );
    return fetchDataFromApi(url, params, retries - 1);
  }

  console.error("%c[TMDB] All retries failed!", "color: red; font-weight: bold;");
  return null;
};

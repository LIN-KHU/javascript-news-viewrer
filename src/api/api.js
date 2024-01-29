  const NEWS_API_BASE_URL = "https://newsapi.org/v2/";
  const API_KEY = process.env.API_KEY;

  export const fetchNews = async (country, category) => {
    const params = new URLSearchParams({
        country,
        category,
        apiKey: API_KEY
    });    

    try {
      const url = `${NEWS_API_BASE_URL}top-headlines?${params.toString()}`;
      let response = await fetch(url);
      let data = await response.json();

      return data;
    } catch (error) {
      alert("Error fetching news:", error);
    }
}

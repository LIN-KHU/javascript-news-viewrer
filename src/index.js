import "./styles";
require("dotenv").config();

class Top {
  constructor() {
    this.topElement = document.getElementById("top");
    this.addTextToTop();
  }

  addTextToTop() {
    this.topElement.innerHTML = "LINKHU-NEWS";
  }
}

class main {
  constructor() {
    const appElement = document.getElementById("main");
    this.fetchNews();
  }

  async fetchNews() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.displayNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  displayNews(articles) {
    const appElement = document.getElementById("main");

    if (articles.length > 0) {
      const newsHtml = articles
        .map(
          (news) => `
        <div class="news-item">
          <h2>${news.title}</h2>
          ${
            news.urlToImage
              ? `<img src="${news.urlToImage}" alt="${news.title}" >`
              : ""
          }
          <p>${news.description}</p>
        </div>
      `
        )
        .join("");
      appElement.innerHTML = newsHtml;
    } else {
      appElement.innerHTML = "<div>No news available</div>";
    }
  }
}

const topInstance = new Top();
const app = new main();

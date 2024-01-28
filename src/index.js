import "./styles";
import TAB_NAME from "./assets/TAB_NAME";
import { fetchNews } from "./api/api";
require("dotenv").config();

class App {
  constructor() {
    const appElement = document.getElementById("app");
  
    console.log(process.env.API_KEY);

    if (!process.env.API_KEY) {
      alert("Please provide a valid News API key in the environment variable file.");
    }

    this.currentTabName = "general";

    fetchNews("kr", "general").then((data) => { 
      this.displayNews(data.articles);
    });

    const nav = document.getElementById("nav");
    TAB_NAME.forEach((tab) => {
      const tabElement = document.createElement("a");
      tabElement.href = "#";
      tabElement.textContent = tab.ko;
      tabElement.addEventListener("click", () => this.handleTabClick(tab.en));
      nav.appendChild(tabElement);
    });
  }
  
  displayNews(articles) {
    const newsSection = document.getElementById("news-section");
    
    newsSection.innerHTML = "";

  
    articles.forEach((article) => {
      const articleElement = document.createElement("article");
      const authorInfo = article.author ? article.author : "알수없음";
      const imageElement = article.urlToImage ? `<img id="image1" src="${article.urlToImage}">` : " ";
      const descriptionElement = article.description ? `<p>${article.description}</p>` : " ";

      articleElement.innerHTML = `
        ${imageElement}
        <h2>${article.title}</h2>
        ${descriptionElement}
        <p class="meta-info">${authorInfo}&nbsp&nbsp&nbsp&nbsp${article.publishedAt}<button class="button-arrow" onclick="window.open('${article.url}', '_blank')"></button></p>
      `;
      newsSection.appendChild(articleElement);
    });
  }
  
  handleTabClick(tabName) {
    this.currentTabName = tabName;
    fetchNews("kr", tabName).then((data) => { 
      this.displayNews(data.articles);
    });
  }
}

const app = new App();

import "./styles";
import TAB_NAME from "./assets/TAB_NAME";
import { fetchNews } from "./api/api";
import Tab from "./assets/tab";
import { openModal } from "./assets/modal";
require("dotenv").config();

class App {
  constructor() {
    const appElement = document.getElementById("app");

    if (!process.env.API_KEY) {
      alert("Please provide a valid News API key in the environment variable file.");
    }

    this.currentTabName = "general";

    fetchNews("kr", "general").then((data) => { 
      this.displayNews(data.articles);
    });

    this.createTabs();
  }

  createTabs() {
    TAB_NAME.forEach((tab) => {
      new Tab(tab, this.handleTabClick.bind(this));
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
        <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a>
        ${descriptionElement}
        <p class="meta-info">${authorInfo}&nbsp&nbsp&nbsp&nbsp${article.publishedAt}
        <button class="button-arrow">의견 보내기</button></p>
      `;

      const opinionButton = articleElement.querySelector(".button-arrow");
      opinionButton.addEventListener("click", () => openModal(article.url));

      newsSection.appendChild(articleElement);
    });
  }
  
  handleTabClick(tabName) {
    fetchNews("kr", tabName).then((data) => { 
      this.displayNews(data.articles);
    });

    const selectedTab = document.querySelector(`#nav a[data-tab="${tabName}"]`);
    if (selectedTab) {
      selectedTab.classList.add('selected');
    }
  }
}

const app = new App();

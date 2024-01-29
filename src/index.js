import "./styles";
import TAB_NAME from "./assets/TAB_NAME";
import { fetchNews } from "./api/api";
import Tab from "./assets/tab";
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
      opinionButton.addEventListener("click", () => this.openModal(article.title));

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

  openModal(articleTitle) {
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close-modal");
    const opinionForm = document.getElementById("opinion-form");
    const opinionTitleInput = document.getElementById("opinion-title");
    const opinionContentTextArea = document.getElementById("opinion-content");

    modal.style.display = "block";

    const storedOpinion = localStorage.getItem(articleTitle);
    if (storedOpinion) {
      const parseOpinion = JSON.parse(storedOpinion);

      opinionTitleInput.value = parseOpinion.title || "";
      opinionContentTextArea.value = parseOpinion.content || "";
    } else {
      opinionTitleInput.value = "";
      opinionContentTextArea.value = "";
    }
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const saveOpinionButton = document.getElementById("save-opinion");
    saveOpinionButton.addEventListener("click", () => {
      const opinion = { title: opinionTitleInput.value, content: opinionContentTextArea.value };
  
      localStorage.setItem(articleTitle, JSON.stringify(opinion));
      modal.style.display = "none";

    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    const editOpinionButton = document.getElementById("edit-opinion");
    if (editOpinionButton) {
      editOpinionButton.remove();
    }

    const editButton = document.createElement("button");
    editButton.textContent = "수정하기";
    editButton.id = "edit-opinion";

    editButton.addEventListener("click", () => {
      editButton.remove();

      opinionTitleInput.disabled = false;
      opinionContentTextArea.disabled = false;

      saveOpinionButton.textContent = "수정 완료";
    });

    saveOpinionButton.textContent = "저장";

    opinionForm.appendChild(editButton);
  }
}

const app = new App();

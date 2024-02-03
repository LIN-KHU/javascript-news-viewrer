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
    const opinionTitle = document.getElementById("opinion-title");
    const opinionContent = document.getElementById("opinion-content");

    modal.style.display = "block";

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
    
    const storedOpinion = localStorage.getItem(articleTitle);
    
    if (storedOpinion) {
      const parseOpinion = JSON.parse(storedOpinion);

      const SavedOpinion = document.getElementById("modal-header");
      SavedOpinion.innerHTML = `
      <h3>${parseOpinion.title}</h3>
      <p>${parseOpinion.content}</p>
      `;
      
      opinionTitle.value = parseOpinion.title;
      opinionContent.value = parseOpinion.content;

      const saveButton = document.getElementById("save-opinion");
      let editButton = document.getElementById("edit-opinion");
      let deleteButton = document.getElementById("delete-opinion");

      if(saveButton) {
        saveButton.remove();
      }

      if (!editButton) {
        editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.id = "edit-opinion";
  
        editButton.addEventListener("click", () => {
          const opinion = { title: opinionTitle.value, content: opinionContent.value };
          localStorage.setItem(articleTitle, JSON.stringify(opinion));
          modal.style.display = "none";
        });
  
        opinionForm.appendChild(editButton);
      }
  
      if (!deleteButton) {
        deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.id = "delete-opinion";
  
        deleteButton.addEventListener("click", () => {
          localStorage.removeItem(articleTitle);
          modal.style.display = "none";
        });
  
        opinionForm.appendChild(deleteButton);
      }
    } else {
      opinionTitle.value = "";
      opinionContent.value = "";

      const saveButton = document.getElementById("save-opinion");
      const editButton = document.getElementById("edit-opinion");
      const deleteButton = document.getElementById("delete-opinion");

      saveButton.textContent = "save";
      saveButton.addEventListener("click", () => {
        const opinion = { title: opinionTitle.value, content: opinionContent.value };
        localStorage.setItem(articleTitle, JSON.stringify(opinion));
        modal.style.display = "none";
      });

      if (editButton) {
        editButton.remove();
      }

      if (deleteButton) {
        deleteButton.remove();
      }
    }
  }
}

const app = new App();

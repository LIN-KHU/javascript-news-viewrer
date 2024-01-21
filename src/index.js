import "./styles";
require("dotenv").config();
import TAP_NAME from "./assets/TAB_NAME";

class App {
  constructor() {
    this.apiKey = process.env.API_KEY || '40a4a566f0eb4cb5aa724df7ddc58ad7';
    this.selectedTap = null;

    const appElement = document.getElementById("app");
    //appElement.innerHTML = "<div>Hello :D</div>";

    // Header
    const headerElement = document.createElement("header");
    headerElement.innerHTML = "<h1>LINKHU-news</h1>";
    appElement.appendChild(headerElement);

    // Navigation
    const navElement = document.createElement("nav");
    const navListElement = document.createElement("ul");

    TAP_NAME.forEach((tap) => {
      const tapItem = document.createElement("li");
      tapItem.textContent = tap.ko;
      tapItem.dataset.tap = tap.en;
      tapItem.addEventListener("click", this.handleTapClick.bind(this));
      
      const underline = document.createElement('div'); //밑줄 생성.
      underline.classList.add('underline');
      tapItem.appendChild(underline);

      navListElement.appendChild(tapItem);

      //전체보기는 기본값으로 파란색.
      if (tap.en === 'all') {
        tapItem.classList.add('active');
        underline.style.width = '100%';
      }
    });

    navElement.appendChild(navListElement);
    appElement.appendChild(navElement);

    // Section
    this.sectionElement = document.createElement("section");
    appElement.appendChild(this.sectionElement);

    //
    this.fetchData();
  }

  async fetchData() {
    try {
      let apiUrl;

      if (this.selectedTap && this.selectedTap !== "all") {
        apiUrl = `http://newsapi.org/v2/top-headlines?country=kr&category=${this.selectedTap}&apiKey=${this.apiKey}`; 
      } else {
        apiUrl = `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${this.apiKey}`
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      this.displayData(data);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  displayData(data) {
    this.sectionElement.innerHTML = ""; //초기화

    const articles = data.articles;
    if (articles && articles.length > 0) {
      // Shuffle
      const shuffledArticles = this.shuffleArray(articles).slice(0, 2);

      shuffledArticles.forEach((article, index) => {
        const articleContainer = document.createElement("div");
        articleContainer.id = `article-${index+1}`; //id 추가.

        // Image
        if (article.urlToImage) {
          const imageElement = document.createElement("img");
          imageElement.src = article.urlToImage;
          imageElement.alt = "Article Image";
          articleContainer.appendChild(imageElement);
        }

        // Title
        const titleElement = document.createElement("h2");
        titleElement.textContent = article.title;
        articleContainer.appendChild(titleElement);

        // content
        const contentElement = document.createElement("p");
        contentElement.textContent = article.description;
        articleContainer.appendChild(contentElement);

        // Author and Date
        const authorDateElement = document.createElement("p");
        authorDateElement.innerHTML = `<strong>Author:</strong> ${article.author || 'Unknown'} | <strong>Date:</strong> ${new Date(article.publishedAt).toLocaleDateString()}`;
        articleContainer.appendChild(authorDateElement);

        this.sectionElement.appendChild(articleContainer);
      });
    } else {
      // 기사 없을 때
      const noDataElement = document.createElement("p");
      noDataElement.textContent = "No articles available for this category.";
      this.sectionElement.appendChild(noDataElement);
    }
  }


  handleTapClick(event) {
    this.selectedTap = event.target.dataset.tap;
    console.log(`Selected Tap: ${this.selectedTap}`);

    const navItems = document.querySelectorAll('nav li');
    navItems.forEach(item => item.classList.remove('active'));

    event.target.classList.add('active');
    
    this.fetchData();

    const activeItem = event.target;
    const underline = activeItem.querySelector('.underline');
    underline.style.width = '100%';
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

const app = new App();

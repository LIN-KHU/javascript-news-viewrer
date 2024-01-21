import "./styles";
import { TAP_NAME } from "./assets/TAB_NAME.js";
require("dotenv").config();

class App {
  constructor() {
    this.appElement = document.getElementById("app");
    this.results = "";

    this.createHeader();
    this.createNav();
    this.organizeResults();
    this.createSection();
    this.start();
  }

  createElement(tag, textContent = "") {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }

  createHeader() {
    const headerElement = this.createElement("header");
    headerElement.classList.add("header");

    const linkhuText = this.createElement("span", "LINKHU");
    linkhuText.classList.add("headerFont", "linkhuText");
    const newsText = this.createElement("span", " - NEWS");
    newsText.classList.add("headerFont", "newsText");

    this.appElement.appendChild(headerElement);
    headerElement.appendChild(linkhuText);
    headerElement.appendChild(newsText);
  }

  createNav() {
    const navElement = this.createElement("tab");
    TAP_NAME.forEach((nav) => {
      const tabElement = this.createElement("div", nav.ko);
      tabElement.classList.add("tab");
      navElement.appendChild(tabElement);
    });
    this.appElement.appendChild(navElement);

    const underline1 = this.createElement("div");
    underline1.classList.add("underline1");
    this.appElement.appendChild(underline1);

    const underline2 = this.createElement("div");
    underline2.classList.add("underline2");
    this.appElement.appendChild(underline2);
  }

  createSection() {
    const sectionElement1 = this.createElement("section", "section1");
    this.appElement.appendChild(sectionElement1);

    const sectionElement2 = this.createElement("section", "section2");
    this.appElement.appendChild(sectionElement2);
  }

  async start() {
    await this.apiManager();
    this.organizeResults();
  }

  async apiManager() {
    const apiKey = "2721d1f0de38415b978ddeed5ff2291a";
    const newsList = document.getElementById("news-list");

    if (!newsList) {
      console.error("Error: newsList is null");
      return;
    }

    try {
      // Promise.all을 사용하여 여러 API 호출을 병렬로 수행
      const apiPromises = TAP_NAME.map(async (nav) => {
        const topic = `${nav.ko}`;
        let apiUrl;

        if (topic === "전체보기") {
          apiUrl = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`;
        } else {
          apiUrl = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.articles;
      });

      // 병렬로 수행된 모든 API 호출의 결과를 기다림
      this.results = await Promise.all(apiPromises);
      //console.log(this.results);

      // results 배열에는 각 API 호출의 결과가 순서대로 들어있음
      this.results.forEach((articles) => {
        articles.forEach((article) => {
          //console.log(article);

          const listItem = document.createElement("li");
          const link = document.createElement("a");

          link.href = article.url;
          link.textContent = article.title;
          listItem.appendChild(link);
          newsList.appendChild(listItem);

          //console.log(listItem);
          //console.log(link);
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  organizeResults() {
    console.log(this.results);
  }
}

const app = new App();

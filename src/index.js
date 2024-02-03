import "./styles";
import { TAP_NAME } from "./assets/TAB_NAME.js";
require("dotenv").config();

class Header {
  constructor(appElement) {
    //매개변수로 입력받음
    this.headerElement = this.createElement("header");
    this.headerElement.classList.add("header");

    const linkhuText = this.createElement("span", "LINKHU");
    linkhuText.classList.add("headerFont", "linkhuText");
    const newsText = this.createElement("span", " - NEWS");
    newsText.classList.add("headerFont", "newsText");

    appElement.appendChild(this.headerElement);
    this.headerElement.appendChild(linkhuText);
    this.headerElement.appendChild(newsText);
  }

  createElement(tag, textContent = "") {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }
}

class Nav {
  constructor(appElement) {
    this.navElement = this.createElement("nav");
    TAP_NAME.forEach((nav) => {
      const tabElement = this.createElement("button", nav.ko);
      tabElement.classList.add("tab", "sensedButton");
      this.navElement.appendChild(tabElement);
    });
    appElement.appendChild(this.navElement);

    const underline1 = this.createElement("div");
    underline1.classList.add("underline1");
    appElement.appendChild(underline1);

    const underline2 = this.createElement("div");
    underline2.classList.add("underline2");
    appElement.appendChild(underline2);
  }

  createElement(tag, textContent = "") {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }
}

class App {
  constructor() {
    this.appElement = document.getElementById("app");
    this.results = [];
    this.countPeople = 0;

    this.createHeader();
    this.createNav();
    this.start();
  }

  createElement(tag, textContent = "") {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }

  createHeader() {
    this.header = new Header(this.appElement);
  }

  createNav() {
    this.nav = new Nav(this.appElement);
  }

  start() {
    this.apiManager().then(() => this.createAndPutContents());
  }

  async apiManager() {
    const apiKey = process.env.API_KEY;

    try {
      this.results = {};

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

        this.results[topic] = data.articles.slice(0, 10);
      });

      await Promise.all(apiPromises);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  createAndPutContents() {
    const sectionElement = this.createElement("section");
    sectionElement.classList.add("section");
    this.appElement.appendChild(sectionElement);

    const sectionElements = [];
    for (let articleIndex = 0; articleIndex < 10; articleIndex++) {
      const image = this.createElement("img");
      image.classList.add(`image`);

      const reporter = this.createElement("p");
      reporter.classList.add(`reporter`);

      const title = this.createElement("p");
      title.classList.add(`title`);

      const description = this.createElement("p");
      description.classList.add(`description`);

      const date = this.createElement("p");
      date.classList.add(`date`);

      const tempSection = this.createElement("section");
      sectionElement.classList.add("section");
      sectionElement.appendChild(tempSection);
      tempSection.appendChild(image);
      tempSection.appendChild(reporter);
      tempSection.appendChild(title);
      tempSection.appendChild(description);
      tempSection.appendChild(date);
      sectionElements.push(tempSection);

      const sensedButtons = document.querySelectorAll(".sensedButton");

      sensedButtons.forEach((button) => {
        let selectedArticles = this.results["전체보기"];
        if (selectedArticles && selectedArticles[articleIndex]) {
          // 둘다 존재한다면
          const article = selectedArticles[articleIndex];

          if (article.urlToImage) {
            //가 존재한다면
            image.src = article.urlToImage;
          }

          title.textContent = article.title || "No Title";
          description.textContent = article.description || "No Description";
          reporter.textContent = `Reporter: ${article.author || "Unknown"}`;
          date.textContent = `Published At: ${
            article.publishedAt || "No Date"
          }`;
        }

        button.addEventListener("click", () => {
          selectedArticles = this.results[button.textContent];
          if (selectedArticles && selectedArticles[articleIndex]) {
            // 둘다 존재한다면
            const article = selectedArticles[articleIndex];

            if (article.urlToImage) {
              //가 존재한다면
              image.src = article.urlToImage;
            }

            reporter.textContent = `Reporter: ${article.author || "Unknown"}`;
            title.textContent = article.title || "No Title";
            description.textContent = article.description || "No Description";
            date.textContent = `Published At: ${
              article.publishedAt || "No Date"
            }`;
          }
        });
      });
    }
    this.createCommentSection(sectionElements);
  }

  createCommentSection(sectionElements) {
    sectionElements.forEach((section) => {
      section.addEventListener("click", () => {
        console.log(section);
        const commentSection = this.createElement("section");
        commentSection.classList.add("comment");

        const articleTitle = section.querySelector(".title").textContent;
        const titleElement = this.createElement("p", articleTitle);
        titleElement.classList.add("commentTitle");

        const articleDescription =
          section.querySelector(".description").textContent;
        const descriptionElement = this.createElement("p", articleDescription);
        descriptionElement.classList.add("commentDescription");

        const commentSection2 = this.createElement("section");
        commentSection2.classList.add("comment2");

        const commentForm = this.createElement("form");

        const commentInput = this.createElement("input");
        commentInput.setAttribute("type", "text");
        commentInput.setAttribute("placeholder", "댓글을 입력하세요");

        const submitButton = this.createElement("button", "댓글 작성");

        commentForm.appendChild(commentInput);
        commentForm.appendChild(submitButton);

        commentSection2.appendChild(commentForm);

        commentForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const commentText = commentInput.value;
          this.submitComment(commentText, commentSection2);
        });

        const closeButton = this.createElement("button", "X");
        closeButton.classList.add("X");

        commentSection.appendChild(titleElement);
        commentSection.appendChild(descriptionElement);
        commentSection.appendChild(commentSection2);
        commentSection.appendChild(closeButton);

        this.appElement.appendChild(commentSection);
        this.closeComment(commentSection, closeButton);
        this.loadExistingComments(commentSection2);
        // this.resetLocalStorage(commentSection2);
      });
    });
  }

  loadExistingComments(commentSection2) {
    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments && storedComments.length > 0) {
      storedComments.forEach((commentText) => {
        const commentElement = this.createElement("p", commentText);
        commentSection2.appendChild(commentElement);
      });
    }
  }

  submitComment(commentText, commentSection2) {
    this.countPeople++;
    const commentContent = `익명 ${this.countPeople}: ${commentText}`;
    const commentElement = this.createElement("p", commentContent);
    commentSection2.appendChild(commentElement);

    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    // 새 댓글을 배열에 추가
    storedComments.push(commentContent);
    // 배열을 다시 로컬 스토리지에 저장
    localStorage.setItem("comments", JSON.stringify(storedComments));
  }

  resetLocalStorage(commentSection2) {
    const resetButton = this.createElement("button", "전체댓글삭제");
    commentSection2.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      localStorage.removeItem("comments");
      // 여기에서 commentSection2 등에 대한 추가적인 처리를 수행할 수 있습니다.
      // 예: commentSection2.innerHTML = ""; // 모든 댓글 섹션을 비움
    });
  }

  closeComment(commentSection, closeButton) {
    closeButton.addEventListener("click", () => {
      if (commentSection.parentNode) {
        commentSection.parentNode.removeChild(commentSection);
      }
    });
  }
}

const app = new App();

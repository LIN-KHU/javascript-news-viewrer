import "./styles";
import { TAP_NAME } from "./assets/TAB_NAME.js";
require("dotenv").config();

class App {
  constructor() {
    this.appElement = document.getElementById("app");

    this.createHeader();
    this.createNav();
    this.createSection();
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
}

const app = new App();

const API_KEY = process.env.API_KEY;

var url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-19&sortBy=popularity&apiKey=${API_KEY}`;

var req = new Request(url);
fetch(req).then(function (response) {
  console.log(response.json());
});

//DOM 구조 생성
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const newsList = document.querySelector(".news-lists");

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector(".search-input");
  const newsList = document.querySelector(".news-lists");

  // 이하 생략...
});

//form 검색 인식하면 이벤트 실행
searchForm.addEventListener("submit", retrieve);

function retrieve(e) {
  //form submit 기본 전송기능(action) 막기
  e.preventDefault();

  let topic = searchInput.value;
  console.log(topic);
  const apiKey = "2721d1f0de38415b978ddeed5ff2291a";
  let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

  //검색내용 없을 때는 alert창 띄우기
  if (topic == "") {
    alert("먼저 검색어를 입력해주시죨.");
    return;
  }

  //news-list의 내용값 비우기(기존 검색된 li 모두 제거)
  newsList.innerHTML = "";

  //newsApi에서 가져온 정보로 DOM에 출력
  fetch(url)
    .then((res) => {
      //fetch : 요청
      return res.json();
    })
    .then((data) => {
      //return 되었다면
      console.log(data);
      data.articles.forEach((article) => {
        //html요소들 추가하고 부모요소에 껴주는 구문
        console.log(article);
      });

      //관련 뉴스 없을 때
      let totalResults = data.totalResults;
      console.log(totalResults);
      if (totalResults == "0") {
        console.log("없");
        let noResullt = document.createElement("strong");
        noResullt.className = "noResult";
        noResullt.textContent = "아이쿠 아무런 기사가 없네요ㅠㅠ";
        newsList.appendChild(noResullt);
      }
    })
    .catch((error) => {
      console.log("error");
    });

  console.log(topic);
}

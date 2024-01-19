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
  }

  createSection() {
    const sectionElement1 = this.createElement("section", "section1");
    this.appElement.appendChild(sectionElement1);

    const sectionElement2 = this.createElement("section", "section2");
    this.appElement.appendChild(sectionElement2);
  }
}

const app = new App();

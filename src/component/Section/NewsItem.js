import Image from "./Image";
import Title from "./Title";
import Content from "./Content";
import AuthorDate from "./AuthorDate";
import Modal from "../../modal/Modal";
import ExistingModal from "../../modal/ExistingModal";

class NewsItem {
  constructor(article, index) {
    this.element = document.createElement("div");
    this.element.id = `article-${index + 1}`;

    if (article.urlToImage) {
      const imageComponent = new Image(article.urlToImage, article.title);
      this.element.appendChild(imageComponent.getElement());
    }

    const titleComponent = new Title(article.title);
    this.element.appendChild(titleComponent.getElement());

    const contentComponent = new Content(article.description);
    this.element.appendChild(contentComponent.getElement());

    const authorDateComponent = new AuthorDate(article.author, article.publishedAt);
    this.element.appendChild(authorDateComponent.getElement());

    this.element.addEventListener("click", this.handleArticleClick.bind(this));
  }

  handleArticleClick() {
    const existingData = JSON.parse(localStorage.getItem('savedData'));
    //const modal = new Modal();
    const modal = existingData ? new ExistingModal(existingData) : new Modal();
    /*if (existingData) {
      // 기존 데이터가 있을 경우, 모달에 데이터를 채워 넣습니다.
      modal.titleInput.value = existingData.title || "";
      modal.contentInput.value = existingData.content || "";
    }*/
    this.element.appendChild(modal.modalElement);
    modal.openModal();
  }

  getElement() {
    return this.element;
  }
}

export default NewsItem;
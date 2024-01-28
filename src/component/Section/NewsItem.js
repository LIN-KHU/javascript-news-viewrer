import Image from "./Image";
import Title from "./Title";
import Content from "./Content";
import AuthorDate from "./AuthorDate";

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
  }

  getElement() {
    return this.element;
  }
}

export default NewsItem;
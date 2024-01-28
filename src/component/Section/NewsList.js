import NewsItem from "./NewsItem";

class NewsList {
  constructor() {
    this.element = document.createElement("section");
  }

  update(data) {
    this.element.innerHTML = "";

    if (data && data.length > 0) {
      data.forEach((article, index) => {
        const newsItem = new NewsItem(article, index);
        this.element.appendChild(newsItem.getElement());
      });
    } else {
      const noDataElement = document.createElement("p");
      noDataElement.textContent = "No articles available for this category.";
      this.element.appendChild(noDataElement);
    }
  }

  getElement() {
    return this.element;
  }
}

export default NewsList;
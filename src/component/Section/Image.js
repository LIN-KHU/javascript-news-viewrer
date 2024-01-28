class Image {
    constructor(url, altText) {
      this.element = document.createElement("img");
      this.element.src = url;
      this.element.alt = altText || "Article Image";
    }
  
    getElement() {
      return this.element;
    }
  }

  export default Image;
class Content {
    constructor(text) {
      this.element = document.createElement("p");
      this.element.textContent = text;
    }
  
    getElement() {
      return this.element;
    }
  }

  export default Content;
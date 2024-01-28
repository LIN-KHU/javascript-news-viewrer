class Title {
    constructor(text) {
      this.element = document.createElement("h2");
      this.element.textContent = text;
    }
  
    getElement() {
      return this.element;
    }
  }

  export default Title;
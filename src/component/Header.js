class Header {
    constructor() {
      this.element = document.createElement("header");
      this.element.innerHTML = "<h1>LINKHU-news</h1>";
    }
  
    getElement() {
      return this.element;
    }
  }

  export default Header;
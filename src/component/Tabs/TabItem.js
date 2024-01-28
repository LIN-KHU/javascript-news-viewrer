class TabItem {
    constructor(tap, fetchDataCallback) {
      this.element = document.createElement("li");
      this.element.textContent = tap.ko;
      this.element.dataset.tap = tap.en;
      this.element.addEventListener("click", (event) => this.handleClick(event, tap.en, fetchDataCallback));
    }
  
    getElement() {
      return this.element;
    }
  
    handleClick(event, selectedTap, fetchDataCallback) {
      selectedTap = selectedTap || event.target.dataset.tap;
      console.log(`Selected Tap: ${selectedTap}`);
  
      const navItems = document.querySelectorAll('nav li');
      navItems.forEach(item => item.classList.remove('active'));
  
      event.target.classList.add('active');
  
      fetchDataCallback(selectedTap);
    }
  
    activate() {
      this.element.classList.add('active');
    }
  }

  export default TabItem;
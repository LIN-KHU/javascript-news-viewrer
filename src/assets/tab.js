class Tab {
    constructor(tabInfo, handleClick) {
      this.tabInfo = tabInfo;
      this.handleClick = handleClick;
      this.render();
    }
  
    render() {
      const tabElement = document.createElement("a");
      tabElement.href = "#";
      tabElement.textContent = this.tabInfo.ko;
      tabElement.addEventListener("click", () => this.handleClick(this.tabInfo.en));
      document.getElementById("nav").appendChild(tabElement);
    }
  }

  export default Tab;

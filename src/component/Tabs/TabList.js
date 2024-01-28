import TAP_NAME from "../../assets/TAB_NAME";
import TabItem from "./TabItem";

class TabList {
  constructor(fetchDataCallback) {
    this.element = document.createElement("nav");
    this.listElement = document.createElement("ul");

    TAP_NAME.forEach((tap) => {
      const tabItem = new TabItem(tap, fetchDataCallback); 
      this.listElement.appendChild(tabItem.getElement());

      if (tap.en === 'all') {
        tabItem.activate();
      }
    });

    this.element.appendChild(this.listElement);
  }

  getElement() {
    return this.element;
  }
}

export default TabList;
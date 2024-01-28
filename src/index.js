import "./styles";
require("dotenv").config();

class App {
  constructor() {
    const appElement = document.getElementById("app");
    appElement.innerHTML = "<div>Hello :D</div>";
    console.log(process.env.API_KEY);
  }
}

const app = new App();

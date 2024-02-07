import "./styles";
require("dotenv").config();

import Header from "./component/Header";
import TabList from "./component/Tabs/TabList";
import NewsList from "./component/Section/NewsList";

class App {
  constructor() {
    this.apiKey = process.env.API_KEY || '40a4a566f0eb4cb5aa724df7ddc58ad7'; //process.env.API_KEY가 정의 안되어 있으면 '40a4~'어쩌고를 사용해라. 
    this.selectedTap = null;

    this.header = new Header();
    this.tabList = new TabList(this.fetchData.bind(this)); //this는 app을 가르키도록 bind. 고정. 
    this.newsList = new NewsList();

    const appElement = document.getElementById("app");
    appElement.appendChild(this.header.getElement());
    appElement.appendChild(this.tabList.getElement());
    appElement.appendChild(this.newsList.getElement());

    this.fetchData(); //페이지 처음 혹은 새로고침 시에만 실행됨. 어떤 탭도 선택 X인 상태. 
  }

  async fetchData(selectedTap) { 
    try {
      let apiUrl;

      if (selectedTap && selectedTap !== "all") {
        apiUrl = `http://newsapi.org/v2/top-headlines?country=kr&category=${selectedTap}&apiKey=${this.apiKey}`;
      } else { //selectedTap이 정의되지 않은 상태. undefined. 
        apiUrl = `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${this.apiKey}`;
      }

      const response = await fetch(apiUrl); //promise객체 반환 fetch니까. 

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json(); //await 제거 시, 아직 response.json() 프로미스 다 json으로 반환할 때까지 완료 안했는데 다음줄 코드 실행해버리므로 화면에 에러메시지 뜨는 거임. 
      console.log("API Response:", data);
      this.newsList.update(data.articles); //NewsList.js에 있는 update메서드 사용. 

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
}

const app = new App();

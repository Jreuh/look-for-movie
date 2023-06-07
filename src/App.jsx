import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://rawg-video-games-database.p.rapidapi.com/games?key=422b029e366d446c8dcc63b45de45a10",
    headers: {
      "X-RapidAPI-Key": "c868e945acmshb11192fc985e8afp10918ajsn10075ee179b5",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      page_size: "40",
    },
    params: {
      page_size: "40",
    },
  };
  async function videgamesLoader() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    videgamesLoader();
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>count is !!!!</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test Yep
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

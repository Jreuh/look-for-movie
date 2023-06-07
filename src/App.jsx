import { useState, useEffect } from "react";
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
  async function videogamesLoader() {
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(data);
  useEffect(() => {
    videogamesLoader();
  }, []);

  data.results &&
    console.log(
      data.results.map((game) =>
        game.platforms.map(
          (plateform) => plateform.platform /*.map((store) => store.name)*/
        )
      )
    );
  return (
    <section className="gameList">
      {data.results &&
        data.results.map((game) => (
          <div className="gameCard" key={game.id}>
            <img src={game.background_image} width="150" alt="" />
            <p>{game.name}</p>
            <div className="gameGenre">
              {game.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <p className="gameScore">{game.metacritic}</p>
          </div>
        ))}
    </section>
  );
}

export default App;

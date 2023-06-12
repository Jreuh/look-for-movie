import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function GameList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurentPage] = useState(
    "https://rawg-video-games-database.p.rapidapi.com/games?key=26bf7c214e2c486a864809a33c33574c"
  );
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setpreviousPage] = useState();
  const [options, setOptions] = useState({
    method: "GET",
    url: currentPage,
    headers: {
      "X-RapidAPI-Key": "c868e945acmshb11192fc985e8afp10918ajsn10075ee179b5",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
    params: {
      page_size: "40",
    },
  });

  async function videogamesLoader() {
    try {
      const response = await axios.request(options);
      setData(response.data);
      setNextPage(response.data.next);
      setpreviousPage(response.data.previous);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    videogamesLoader();
  }, [currentPage]);

  function goToNextPage() {
    setOptions({
      method: "GET",
      url: nextPage,
      params: {
        page_size: "40",
      },
    });
    setCurentPage(nextPage);
  }
  function goTopreviousPage() {
    setOptions({
      method: "GET",
      url: previousPage,
      params: {
        page_size: "40",
      },
    });
    setCurentPage(previousPage);
  }
  function handleGenre(e) {
    setOptions({
      method: "GET",
      url: `https://rawg-video-games-database.p.rapidapi.com/games?genre=${e.target.value}&key=26bf7c214e2c486a864809a33c33574c`,
      headers: {
        "X-RapidAPI-Key": "c868e945acmshb11192fc985e8afp10918ajsn10075ee179b5",
        "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      },
      params: {
        page_size: "40",
        genres: "action",
      },
    });
    console.log(e);
    console.log(options.url);
    console.log(data);
    setCurentPage(options.url);
  }

  return (
    <main>
      {data.next && <button onClick={goToNextPage}>Next</button>}
      {data.previous && <button onClick={goTopreviousPage}>Previous</button>}
      <button value="Action" onClick={handleGenre}>
        ACTION
      </button>
      <section className="gameList">
        {data.results &&
          data.results.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <div className="gameCard">
                <img
                  src={game.background_image}
                  width="150"
                  height="150"
                  alt=""
                />
                <p>{game.name}</p>
                <div className="gameGenre">
                  {game.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
                <p className="gameScore">{game.metacritic}</p>
              </div>
            </Link>
          ))}
      </section>
    </main>
  );
}

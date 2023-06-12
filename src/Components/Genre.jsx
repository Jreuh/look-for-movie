import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";

export default function Genre() {
  const [genres, setGenres] = useState([]);
  const options = {
    method: "GET",
    url: `https://rawg-video-games-database.p.rapidapi.com/genres?key=26bf7c214e2c486a864809a33c33574c`,
    headers: {
      "X-RapidAPI-Key": "c868e945acmshb11192fc985e8afp10918ajsn10075ee179b5",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
    params: {
      page_size: "20",
    },
  };
  async function genresLoader() {
    try {
      const response = await axios.request(options);
      console.log("response", response.data);
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    genresLoader();
  }, []);

  console.log(genres);

  return (
    <div>
      {genres.results &&
        genres.results.map((genre) => (
          <Button key={genre.id} name={genre.name} />
        ))}
    </div>
  );
}

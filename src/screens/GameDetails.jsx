import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function GameDetails() {
  const [data, setData] = useState(null);
  const { id = "" } = useParams();
  console.log(id);

  const options = {
    method: "GET",
    url: `https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=26bf7c214e2c486a864809a33c33574c`,
    headers: {
      "X-RapidAPI-Key": "c868e945acmshb11192fc985e8afp10918ajsn10075ee179b5",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      page_size: "40",
    },
    params: {
      page_size: "40",
      ordering: "rating",
    },
  };

  async function videogameLoader() {
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    videogameLoader();
  }, []);

  console.log(data);
  return (
    data && (
      <div>
        <div>
          <img src={data.background_image_additional} alt="" />
          <p>{data.description_raw}</p>
          {data.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <div>
          <div className="gameGenre">
            <div className="gamePlateform">
              {data.platforms.map((plateform) => (
                <p key={plateform.platform.id}>{plateform.platform.name}</p>
              ))}
            </div>
          </div>
          <div>
            developped by:
            {data.developers.map((studio) => (
              <p key={studio.id}>{studio.name}</p>
            ))}
          </div>
          <p>
            <a href={data.website}>official webstite</a>
          </p>
        </div>
        <Link to={"/"}>Retour a la page dacceuil</Link>
      </div>
    )
  );
}

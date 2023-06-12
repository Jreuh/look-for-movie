import axios from "axios";

export default function Genre() {
  const options = {};
  async function videogamesLoader() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

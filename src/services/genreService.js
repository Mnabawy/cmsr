// call the backend
import axios from "axios";
// return  the gere list

export const getGenres = async () => {
  const { data: genres } = await axios.get("http://localhost:3900/api/genres");
  return genres;
};

import axios from "axios";
import { getGenres } from "./genreService";

const url = "http://localhost:3900/api/movies";

// read
// movies
export const getMovies = async () => {
  const { data: movies } = await axios.get(url);
  return movies;
};

// movie
export const getMovie = async id => {
  const { data: movies } = await axios.get(`${url}/${id}`);
  return movies;
};

// write && update
export const saveMovie = async movie => {
  // if the movie is in the db call axios.put
  const list = await getMovies();
  const movieInDb = list.find(m => m._id === movie._id);
  if (movieInDb) {
    const newMovie = {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genreId,
    };

    console.log("movieInDb", newMovie);
    await axios
      .put(url + "/" + movieInDb._id, newMovie)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  } else {
    // if the movie not in the db call axios to post
    await axios.post(url, movie);
  }
};

// delete
export const deleteMovie = async id => {
  return await axios.delete(url + "/" + id);
};

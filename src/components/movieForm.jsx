import React from "react";
import Joi from "joi-browser";

import { getGenres } from "../services/fakeGenreService";
import { getMovie, getMovies, saveMovie } from "../services/fakeMovieService";
import InputField from "./common/inputField";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    console.log(this.props.match.params);
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { title, genreId, numberInStock, dailyRentalRate } = this.state.data;

    const {
      title: titleError,
      genreId: genreError,
      numberInStock: numberInStockError,
      dailyRentalRate: dailyRentalError,
    } = this.state.errors;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Title"
            name="title"
            type="text"
            className="form-control"
            value={title}
            onChange={this.handleChange}
            error={titleError}
          />
          <label>Genre</label>
          <select
            value={genreId}
            onChange={this.handleChange}
            name="genreId"
            className="form-control mb-3"
          >
            <option value=""></option>
            {this.state.genres.map(genre => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {genreError &&
            <div className="alert alert-danger " style={{marginTop:-16}}>{genreError}</div>
          }

          <InputField
            label="Number In Stock"
            type="number"
            className="form-control"
            name="numberInStock"
            value={numberInStock}
            onChange={this.handleChange}
            error={numberInStockError}
          />
          <InputField
            label="Rate"
            type="number"
            className="form-control"
            name="dailyRentalRate"
            value={dailyRentalRate}
            onChange={this.handleChange}
            error={dailyRentalError}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;

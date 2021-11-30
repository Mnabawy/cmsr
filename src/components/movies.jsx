import React from "react";
import _ from "lodash";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import Paginate from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 4,
      currentPage: 1,
      genres: [],
      selectedGenre: "",
      sortColumn: { path: "title", order: "asc" },
      movies: [],
      searchText: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  async componentDidMount() {
    const genresList = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genresList];
    const moviesList = await getMovies();

    this.setState({ movies: moviesList, genres });
  }

  handleDelete = async id => {
    const movies = [...this.state.movies];
    const filtered = movies.filter(m => m._id !== id);
    this.setState({ movies: filtered });
    return await deleteMovie(id);
  };

  handleClick = async event => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  onGenreChange(genre) {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  handleSort(sortColumn) {
    this.setState({
      sortColumn,
    });
  }

  // search
  onSearchChange = e => {
    const { value } = e.target;
    this.setState({ searchText: value });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchText,
    } = this.state;

    if (allMovies.length === 0) return "movies list is empty";

    const list = allMovies.filter(movie => {
      if (searchText == "") {
        return movie;
      } else if (movie.title.toLowerCase().includes(searchText.toLowerCase())) {
        return movie;
      }
    });

    const filtered =
      selectedGenre && selectedGenre._id
        ? list.filter(m => m.genre._id === selectedGenre._id)
        : list;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

    return (
      <div className="d-flex flex-row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.onGenreChange}
          />
        </div>
        <div className="col-9">
          <Link to="/movies/new" className="btn btn-primary mt-2">
            new movie
          </Link>
          {<p className="mt-2">rendring {filtered.length} movies</p>}
          <input
            type="text"
            name="search"
            onChange={this.onSearchChange}
            value={searchText}
            className="form-control mt-2 mb-3"
            placeholder="enter text to search"
          />
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onSort={this.handleSort}
            searchText={searchText}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

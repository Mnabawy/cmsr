import React from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete(id) {
    const movies = this.state.movies.filter(movie => movie._id !== id);
    // limit the list to only 4 element

    this.setState({ movies });
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

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

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (allMovies.length === 0) return "movies list is empty";

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
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
          {<p>rendring {filtered.length} movies</p>}

          <Link to="/movies/new" className="btn btn-primary" >new movie</Link>
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onSort={this.handleSort}
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

import React from "react";
import { Link } from "react-router-dom";

class MoviesTable extends React.Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onSort: raiseSort, searchText, onDelete } = this.props;
    return (
      <table className="table text-left">
        <thead>
          <tr>
            <th scope="col" onClick={() => this.raiseSort("title")}>
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th>Delete</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button onClick={() => onDelete(movie._id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;

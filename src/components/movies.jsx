import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import Paginate from "../utils/paginate";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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

  render() {
    const { movies, pageSize, currentPage } = this.state;
    // Originaly we have movies array
    // I need to modify this array each time we click a pagination button
    // currentPage 1 [item1,item2, item3, item4] , currentPage 2 [item5,item6,item7,item8]
    // modify the movies array pased on the index of the each page
    // starting point , end point and list

    // ex ['a' , 'b' , 'c' , 'd' , 'e' ,  'f' , 'g' , 'h' , 'i' , 'j' ]

    if (movies.length === 0) return "movies list is empty";

    const paginatedMovies = Paginate(movies, currentPage, pageSize);

    const renderMovies = paginatedMovies.map(movie => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
        </tr>
      );
    });

    return (
      <>
        {movies.length && <p>rendring {movies.length} movies</p>}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderMovies}</tbody>
        </table>
        <Pagination
          itemsCount={movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Movies;

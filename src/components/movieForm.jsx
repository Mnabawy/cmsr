import React from "react";

class MovieForm extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form:{match.params.id} </h1>
      </div>
    );
  }
}

export default MovieForm;

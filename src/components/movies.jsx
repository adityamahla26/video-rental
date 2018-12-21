import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./movieTable";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = movie => {
    const movies = this.state.movies.map(m => {
      if (m._id === movie._id) {
        movie.liked = !movie.liked;
        return movie;
      } else {
        return m;
      }
    });
    this.setState({ movies });
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };
  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, sortColumn } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(m => m.genre._id === selectedGenre._id)
        : this.state.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    } else {
      return (
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies in the database</p>
            <MovieTable
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              movies={movies}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemCount={filtered.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      );
    }
  }
}

export default Movies;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSort] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7000/movies/")
      .then((res) => {
        let sortedMovies = [...res.data];
        if (sortBy === "asc") {
          sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "desc") {
          sortedMovies.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === "genre") {
          sortedMovies.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (sortBy === "year") {
          sortedMovies.sort((a, b) => b.year - a.year);
        }
        setMovies(sortedMovies);
      })
      .catch((err) => console.log(err));
  }, [sortBy]);

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  }

  return (
    <div className="bigbox">
      <Header />
      <div className="search-sort-box">
        <div className="search-box">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="submit-button" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="sort-box">
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="genre">Genre</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <div className="list">
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            islower={true}
            bigger={false}
            favourites={false}
            key={movie.id}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;

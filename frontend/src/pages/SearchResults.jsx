import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`http://localhost:7000/search/?q=${searchTerm}`)
        .then((res) => {
          if (res.data.length === 0) {
            setError("Nothing Found");
          } else {
            setSearchedMovies(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [searchTerm]);

  return (
    <div className="bigbox">
      <Header />
      {error && <div className="title">{error}</div>}
      {searchedMovies.length !== 0 && (
        <h2 className="title">Search Results for: {searchTerm}</h2>
      )}
      <div className="list">
        {searchedMovies.map((movie) => (
          <MovieCard
            movie={movie}
            islower={true}
            bigger={false}
            key={movie.id}
          />
        ))}
      </div>
      <button
        className="submit-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </button>
      <Footer />
    </div>
  );
}

export default SearchResults;

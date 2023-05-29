import React, { useLayoutEffect, useMemo } from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/authContext";

function RateMovie() {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [actors, setActors] = useState([]);

  const [avgRating, setavgRating] = useState("");
  const [allreviews, setAllReviews] = useState([]);

  const header = currentUser
    ? { headers: { Token: currentUser.token } }
    : undefined;

  useEffect(() => {
    axios
      .get("http://localhost:7000/movies/" + id)
      .then((res) => {
        setMovie(res.data[0]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:7000/movies/${id}/avg`, header)
      .then((res) => {
        setavgRating(res.data[0].avg_rating);
      })
      .catch((err) => {
        setError(err.response.data);
      });

    axios
      .get(`http://localhost:7000/movies/${id}/reviews`, header)
      .then((res) => {
        setAllReviews(res.data);
      })
      .catch((err) => setError(err.response.data));
  }, []);

  useEffect(() => {
    if (movie.actors) {
      setActors(movie.actors);
    }
  }, [movie]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        `http://localhost:7000/movies/${id}/ratings`,
        {
          user_id: currentUser.id,
          movie_id: id,
          rating: rating,
          review: review,
        },
        header
      )
      .then((res) => {
        console.log(res);
        window.location = "/";
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response);
      });
  }

  return (
    <div>
      <Header />
      <h1 className="title"> Rate the Movie :</h1>
      <div className="container-rate">
        <div className="list">
          <MovieCard
            movie={movie}
            islower={false}
            bigger={true}
            rating={avgRating}
            key={movie.id}
          />

          <div
            className="movie-trailer"
            dangerouslySetInnerHTML={{ __html: movie.trailer }}
          />

          <div className="actors-box review-card">
            <h1>Actors</h1>
            <ul>
              {actors.map((actor) => {
                return <li>{actor}</li>;
              })}
            </ul>
          </div>
          <div className="review-form-container  ">
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Rating:
                <input
                  type="number"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                />
              </label>
              <label>
                Review:
                <input
                  type="text"
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                />
              </label>

              <button className="submit-button" type="submit">
                Submit
              </button>
              {error && (
                <div className="error-box">
                  <div className="error-message">{error}</div>
                </div>
              )}
            </form>
          </div>
          <div className="review-card">
            <h4>All Reviews</h4>

            <ul>
              {allreviews.map((review) => {
                return (
                  <li>
                    {review.name} :<span> " {review.review} "</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RateMovie;

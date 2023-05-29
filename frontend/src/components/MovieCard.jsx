import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function MovieCard(props) {
  const { currentUser } = useContext(AuthContext);

  const [error, setError] = useState("");

  function addFavourite(user_id) {
    axios
      .post(
        `http://localhost:7000/users/${user_id}/favourites`,
        { movie_id: props.movie.id },
        {
          headers: {
            Token: currentUser.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setError("Movie Added to your Favourites");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          console.log(err);
          setError("Movie is already in your favorites");
        } else {
          setError("An error occurred while adding the movie to favorites");
        }
      });
  }

  function removeFavourite() {
    props.onRemove(props.movie.id);
  }
  console.log(props.movie.actors);
  return (
    <div className={props.bigger ? "card big-card" : "card"}>
      <img
        src={props.movie.image}
        alt={props.movie.name}
        className={props.bigger ? "card-img big-img" : "card-img"}
      />
      <div className="card-body">
        {props.rating && (
          <div className="avg-rating">
            <p className="avg-rating-txt">Rating: {props.rating}</p>
          </div>
        )}
        <h5
          className={props.bigger ? "card-title big-card-title" : "card-title"}
        >
          {props.movie.name}
        </h5>
        <p className={props.bigger ? "card-year big-card-year" : "card-year"}>
          {props.movie.year}
        </p>
        <p
          className={
            props.bigger
              ? "card-description big-card-description"
              : "card-description"
          }
        >
          {props.movie.description}
        </p>

    
        {props.islower && (
          <div className="button-box">
            {currentUser && (
              <Link
                to={`/rate/${props.movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <button className="r-button">MORE</button>
              </Link>
            )}
            {props.favourites && (
              <button onClick={removeFavourite} className="r-button">
                Remove
              </button>
            )}

            {currentUser && props.favourites === false && (
              <button
                onClick={() => addFavourite(currentUser.id)}
                className="f-button"
              >
                +
              </button>
            )}
          </div>
        )}
        {error && (
          <div className="error-box">
            <div className="error-content">
              <div className="error-message">{error}</div>
              <button className="close-button" onClick={() => setError(null)}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;

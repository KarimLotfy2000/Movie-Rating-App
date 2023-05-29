import React, { useState, useContext } from "react";

import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/authContext";

function AddMovie() {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const movie = { name, year, description, genre, image };

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:7000/movies/add", movie, {
        headers: {
          Token: currentUser.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.sqlMessage);
      });
  }

  return (
    <div>
      <Header />

      <div className="container">
        <h1 className="title">Add a Movie </h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                value={year}
                onChange={(event) => setYear(event.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              />
              <label>
                Image URI:
                <input
                  type="text"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                />
              </label>
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
      </div>
      <Footer />
    </div>
  );
}

export default AddMovie;

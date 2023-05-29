import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:7000/users/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title">Register</h1>
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
              Email:
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
      </div>{" "}
      #
      <Footer />
    </div>
  );
}

export default Register;

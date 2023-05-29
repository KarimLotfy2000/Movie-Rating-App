import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setcurrentUser } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/users/login",
        { email: email, password: password },
        { withCredentials: true }
      );
      setcurrentUser(res.data);

      window.location = "/";
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div>
      <Header />

      <div className="container">
        <h1 className="title">Login</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <Link to="/register">
              <p class="to-register">Don't Have an account ? Register </p>
            </Link>

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
      </div>
      <Footer />
    </div>
  );
}

export default Login;

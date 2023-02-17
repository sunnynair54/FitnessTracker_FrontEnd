import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { APIURL } from "..";

const Login = ({ setToken }) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${APIURL}api/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }

      alert("Login successful");
      setToken(json.token);
      history.push("/Routines");
    } catch (e) {
      console.error(e);
      setError(e);
    }

    setUsername("");
    setPassword("");
  };


  return (
    <div className="logCenter">
      <form onSubmit={handleSubmit}>
        <div className="user">
          <label className="usernameText" htmlFor="username">Username:</label>
          <input className="userInput"
            type="text" required
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div className="password">
          <label className="passwordText" htmlFor="password">Password:</label>
          <input className="passInput"
            type="password" required
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="logInButton" type="submit">Login</button>
      </form>
      <div className="signInError">{error}</div>
      <h2 className="signupMessage">Not a Stranger? <Link className="signupLink" to="/Signup">Signup</Link></h2>
    </div>
  );
};

export default Login;

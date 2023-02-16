import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signup } from "../API";
import { Link } from "react-router-dom";





const Signup = ({ setToken }) => {
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
      const tokenInfo = await signup(username, password);
      alert("Signup successful");
      setToken(tokenInfo);
      history.push("/Routines");
    } catch (e) {
      console.error(e)
      setError(e);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="signUpCenter">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="usernameText" htmlFor="username">New Username:</label>
          <input className="userInput"
            type="text" required
            name="username"
            value={username}
            minLength="5"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="passwordText" htmlFor="password">New Password:</label>
          <input className="passInput"
            type="password" required
            name="password"
            value={password}
            minLength="5"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="createButton" type="submit">Create Stranger!</button>
        <div className="signInError">{error}</div>
        <div className="logInSignUp2"><Link className="logInSignUpButton2" to="/Login">Login</Link></div>
      </form>
    </div>
  );
};

export default Signup;

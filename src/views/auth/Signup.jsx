import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import atminelogo from "../../assets//atmine_large.png";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match, unable to create user");
    } else {
      setErrorMessage(undefined);
    }
  }, [passwordControl, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({
        username: user.username,
        email: user.email,
        password,
      });
      navigate("/login");
      toast.success("Welcome to atmine, please verify your email!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create user account");
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-image">
        <img src={atminelogo} alt="atminelogo" />
      </div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="generic-form">
        <div className="form-field">
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Repeat the password</label>
          <input
            required
            type="password"
            name="passwordControl"
            value={passwordControl}
            onChange={(e) => setPasswordControl(e.target.value)}
          />
        </div>
        <button className="cta-button" type="submit">
          Register
        </button>
        <p>
          Already a member? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

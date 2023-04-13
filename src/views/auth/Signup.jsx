import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import atminelogo from "../../assets//atmine_large.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordControl, setShowPasswordControl] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await authService.signup({
        username: user.username,
        email: user.email,
        password,
      });
      navigate("/login");
      toast.success("Welcome! Please verify your email to log in.", {
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
    setTimeout(() => setLoading(false), 2000); // Delay for 2 seconds
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordControlVisibility = () => {
    setShowPasswordControl((prev) => !prev);
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
          <div className="password-input">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-field">
          <label>Repeat the password</label>
          <div className="password-input">
            <input
              required
              type={showPasswordControl ? "text" : "password"}
              name="passwordControl"
              value={passwordControl}
              onChange={(e) => setPasswordControl(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordControlVisibility}
            >
              {showPasswordControl ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="text-center mt-4">
        <button
          type="submit"
          className={`cta-button full100 ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            "Register"
          )}
        </button>
        </div>
        <p className="cta-small-text">
          <small>Already a member?</small>
          <br></br>
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

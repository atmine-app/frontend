import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import atminelogo from "../../assets/atmine_1_purple.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(user);
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate("/");
        toast.success("Welcome back!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setErrorMessage("Unable to authenticate user");
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
    } catch (error) {
      setErrorMessage("Unable to authenticate user");
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

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-container">
      <div className="form-image">
        <img src={atminelogo} alt="atminelogo" />
      </div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="generic-form">
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
              value={user.password}
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
            "Log in"
          )}
        </button>
        </div>
        <p className="cta-small-text">
          <small>Don't have an account?</small>
          <br></br>
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

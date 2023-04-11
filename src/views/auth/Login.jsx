import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import atminelogo from "../../assets//atmine_large.png";

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user)
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/');
        toast.success('Welcome back!', {
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
        setErrorMessage('Unable to authenticate user');
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
      setErrorMessage('Unable to authenticate user');
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
  }

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <div className="form-container">
    <div className="form-image">
        <img src={atminelogo} alt="atminelogo" />
      </div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className='generic-form'>
        <div className="form-field">
          <label>Email</label>
          <input required type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input required type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button className="cta-button" type="submit">Log in </button>
        <p className="cta-small-text"><small>Don't have an account?</small><br></br><Link to="/login">Sign up</Link></p>
      </form>
    </div>
  )
}
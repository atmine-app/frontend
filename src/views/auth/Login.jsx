import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

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
        toast.success('Welcome back!')
      } else {
        setErrorMessage('Unable to authenticate user')
      }
    } catch (error) {
      setErrorMessage('Unable to authenticate user');
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
    <div>
      <form onSubmit={handleSubmit} className='genericForm'>
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={user.password} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Log in </button>
      </form>
    </div>
  )
}

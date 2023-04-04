import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      {/* {user && <p>Hello {user.username}</p> } */}
      <ul className='navbar__list'>
        <li><NavLink to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/pay">Pay</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/profile">My Profile</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/register-property">Add property</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
  )
}

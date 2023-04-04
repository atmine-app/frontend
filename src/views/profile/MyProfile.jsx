import React, { useState, useEffect,useContext } from 'react';
import userService from '../../services/userService';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function MyProfile() {
  const [user, setUser] = useState(null);
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  
  useEffect(() => {
    userService.getUser()
      .then(userData => setUser(userData))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>MyProfile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Phone: {user.phone}</p>
          <p>Google ID: {user.googleId}</p>
          <p>Birthday: {user.birthdate}</p>
          <p>Passport/ID Number: {user.passport}</p>
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        </div>
      )}
    </div>
  )
}
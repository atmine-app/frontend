import React, { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
import { useAuth } from '../../hooks/useAuth';


export default function MyProfile() {

  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const { user } = useAuth();

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
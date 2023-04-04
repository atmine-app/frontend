import React, { useState, useEffect,useContext } from 'react';
import userService from '../../services/userService';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function MyProfile() {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  
=======
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

>>>>>>> myProfileUpdated
  useEffect(() => {
    userService.getUser()
      .then(userData => {
        setUser(userData);
        setEmail(userData.email);
        setName(userData.name);
        setPhone(userData.phone);
      })
      .catch(error => console.log(error));
  }, []);

  const saveChanges = () => {
    const updatedUser = {
      email,
      name,
      phone,
      // Add other editable fields here
    };
    userService.updateUser(user._id)
    console.log(updatedUser)
      .then(() => {
        // Optionally update the user state to reflect the changes
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>MyProfile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
<<<<<<< HEAD
          <p>Name: {user.name}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Phone: {user.phone}</p>
          <p>Google ID: {user.googleId}</p>
          <p>Birthday: {user.birthdate}</p>
          <p>Passport/ID Number: {user.passport}</p>
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
=======
          <p>Name: {user.username}</p>
          <p>Lastname: {user.lastname || "undefined"}</p>
          <p>Phone: {user.phone || "undefined"}</p>
          <p>Google ID: {user.googleId || "undefined"}</p>
          <p>Birthday: {user.birthdate || "undefined"}</p>
          <p>Passport/ID Number: {user.passport || "undefined"}</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={saveChanges}>Save Changes</button>
>>>>>>> myProfileUpdated
        </div>
      )}
    </div>
  );
}
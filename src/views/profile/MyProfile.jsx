import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';
import Multiupload from '../../components/Multiupload/Multiupload';

export default function MyProfile() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useAuth();
  const [avatarImage, setAvatarImage] = useState('');

   console.log(user);

  const handleAvatarUpload = (imageData) => {
    setAvatarImage(imageData.array[0]);
  };

  const handleSaveAvatar = async () => {
    try {
      await userService.updateUser({ ...user, avatar: avatarImage });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>MyProfile</h1>
      {user && (
        <div>
          {user.avatar && (
            <img src={user.avatar} alt="Avatar" style={{ width: '100px', height: '100px' }} />
          )}
          <p>Email: {user.email}</p>
          <p>Name: {user.username}</p>
          <p>Google ID: {user.googleId}</p>
          <p>Status: {user.status}</p>
          <p>Status: {user.role}</p>
          {avatarImage && (
            <img src={avatarImage} alt="Avatar" style={{ width: '100px', height: '100px' }} />
          )}
          {isLoggedIn && (
            <div>
              <Multiupload onImageDataChange={handleAvatarUpload} />
              <button onClick={handleSaveAvatar}>Save</button>
              <button onClick={() => logOutUser()}>Log out</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
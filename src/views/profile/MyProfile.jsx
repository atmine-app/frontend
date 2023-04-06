import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';
import SingleImageUpload from '../../components/SingleUpload/SingleImageUpload';
import { BsFillHouseAddFill } from "react-icons/bs";
import { Link} from "react-router-dom";
import { HiUser } from "react-icons/hi";
import './MyProfile.css'
import BackNavigation from '../../components/BackNavigation/BackNavigation';

export default function MyProfile() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useAuth();
  const [avatarImage, setAvatarImage] = useState("");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleAvatarUpload = (imageData) => {
    setAvatarImage(imageData);
  };

  const handleSaveAvatar = async () => {
    try {
      await userService.updateUser({ ...user, avatar: avatarImage });
      setShowAvatarUpload(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logOutUser();
  };

  const handleUpdateAvatar = () => {
    setShowAvatarUpload(!showAvatarUpload);
  };

  return (
    <div>
      <BackNavigation />
      <div className="contentWrapper">
      <div className="profileContainer">
      <div className="profileHeader">
        <HiUser className="profileIcon" />
        <h1 className="profileTitle">Profile</h1>
      </div>
      {user && (
        <div className="profileBody">
          <div className="profileSection">
            <h2 className="profileSectionTitle">Personal Information</h2>
            <div className="avatarSection">
              {avatarImage && (
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="profileAvatar"
                />
              )}
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="profileAvatar"
                />
              )}
              <div className="avatarActions">
                {isLoggedIn && (
                  <>
                    {showAvatarUpload ? (
                      <>
                        <SingleImageUpload onImageDataChange={handleAvatarUpload} />
                        <button className="profileButton" onClick={handleSaveAvatar}>Save</button>
                      </>
                    ) : (
                      <button className="profileButton" onClick={handleUpdateAvatar}>Update Avatar</button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="profileInfo">
              <p className="profileInfoItem">
                <strong>Email: </strong>{user.email}
              </p>
              <p className="profileInfoItem">
                <strong>Name: </strong>{user.username}
              </p>
              <p className="profileInfoItem">
                <strong>Google ID: </strong>{user.googleId}
              </p>
              <p className="profileInfoItem">
                <strong>Status: </strong>{user.status}
              </p>
              <p className="profileInfoItem">
                <strong>Role: </strong>{user.role}
              </p>
            </div>
            <div className="logoutSection">
              <button className="profileButton" onClick={handleLogout}>Log out</button>
            </div>
          </div>
          <div className="profileSection">
            <BsFillHouseAddFill className="profileIcon" />
            <h2 className="profileSectionTitle">Hosting</h2>
            <Link to="/register-property" className="profileLink">
              <p className="profileLinkText">List your space</p>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
      </div>
    
  );
}
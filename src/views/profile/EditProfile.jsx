import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import userService from "../../services/userService";
import SingleImageUpload from "../../components/SingleUpload/SingleImageUpload";
import { RxAvatar } from "react-icons/rx";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";

export default function EditProfile() {
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
      <BackNavigationFloat />
    <div className="editProfileContainer">
      <div className="editProfileHeader">
        <h1 className="editProfileTitle">Edit Profile</h1>
      </div>
      <div className="editProfileBody">
        <div className="editProfileSection">
          <RxAvatar className="editProfileIcon" />
          <h2 className="editProfileSectionTitle">Personal Information</h2>
          <div className="avatarSection expand">
            {avatarImage && (
              <img
                src={avatarImage}
                alt="Avatar"
                className="editProfileAvatar"
              />
            )}
            {user.avatar && (
              <img
                src={user.avatar}
                alt="Avatar"
                className="editProfileAvatar"
              />
            )}
            <div className="avatarActions">
              {isLoggedIn && (
                <>
                  {showAvatarUpload ? (
                    <>
                      <SingleImageUpload
                        onImageDataChange={handleAvatarUpload}
                      />
                      <button
                        className="editProfileButton"
                        onClick={handleSaveAvatar}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      className="editProfileButton"
                      onClick={handleUpdateAvatar}
                    >
                      Update Avatar
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="editProfileInfo">
            <p className="editProfileInfoItem">
              <strong>Email: </strong>
              {user.email}
            </p>
            <p className="editProfileInfoItem">
              <strong>Name: </strong>
              {user.username}
            </p>
            <p className="editProfileInfoItem">
              <strong>Google ID: </strong>
              {user.googleId}
            </p>
            <p className="editProfileInfoItem">
              <strong>Status: </strong>
              {user.status}
            </p>
            <p className="editProfileInfoItem">
              <strong>Role: </strong>
              {user.role}
            </p>
          </div>
          <div className="editProfileLogoutSection">
            <button className="editProfileButton" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
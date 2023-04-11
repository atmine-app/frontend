import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import userService from "../../services/userService";
import SingleImageUpload from "../../components/SingleUpload/SingleImageUpload";
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
          <h2 className="editProfileTitle">Edit Profile</h2>
        <div className="editProfileBody">
          <div className="editProfileSection">
            <div className="avatarSection">
            <div className="avatarImage">
                {(avatarImage || user.avatar) && (
                  <img
                    src={avatarImage || user.avatar}
                    alt="Avatar"
                    className="editProfileAvatar"
                  />
                )}
              </div>
              <div className="avatarActions">
                {isLoggedIn && (
                  <>
                    {!showAvatarUpload && (
                      <button
                        className="cta-button"
                        onClick={handleUpdateAvatar}
                      >
                        Update Avatar
                      </button>
                    )}
                    {showAvatarUpload && (
                      <>
                        <SingleImageUpload
                          onImageDataChange={handleAvatarUpload}
                        />
                        <div className="avatarButtons">
                          <button
                            className="cta-button"
                            onClick={handleSaveAvatar}
                          >
                            Save
                          </button>
                          <button
                            className="cta-button danger"
                            onClick={handleUpdateAvatar}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="editProfileInfo section">
              <p className="editProfileInfoItem">
                <strong>Email: </strong>
                {user.email}
              </p>
              <p className="editProfileInfoItem">
                <strong>Username: </strong>
                {user.username}
              </p>
              <p className="editProfileInfoItem">
                <strong>Google ID: </strong>
                {user.googleId}
              </p>
            </div>
          </div>
        </div>
        <div className="editProfileLogoutSection section">
          <button className="cta-button danger" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
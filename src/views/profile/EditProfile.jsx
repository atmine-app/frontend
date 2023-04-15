import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import propertyService from "../../services/propertyService";
import SingleImageUpload from "../../components/SingleUpload/SingleImageUpload";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";

export default function EditProfile() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useAuth();
  const [avatarImage, setAvatarImage] = useState("");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [hasActiveBookings, setHasActiveBookings] = useState(false);
  const navigate = useNavigate();

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
    toast.success("Successful Logout! Come back soon 🔥", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  const handleUpdateAvatar = () => {
    setShowAvatarUpload(!showAvatarUpload);
  };

  useEffect(() => {
    const checkActiveBookings = async () => {
      try {
        const allProperties = await propertyService.getAllProperties();
        const userProperties = allProperties.filter(property => property.owner._id === user._id);
        const activeBookings = userProperties.some(
          property => property?.bookings?.some(booking => booking.status === 'active')
        );
        console.log(allProperties)
        console.log(userProperties)
        console.log(activeBookings)
        setHasActiveBookings(activeBookings);
      } catch (error) {
        console.log(error);
      }
    };

    checkActiveBookings();
  }, [user._id]);

  const handleInactivateUser = async () => {
    try {
      await userService.inactivateUser(user._id);
      logOutUser();
      toast.success("User successfully inactivated", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
        {user.status === "active" && !hasActiveBookings && (
          <div className="editProfileLogoutSection section">
            <button className="cta-button danger" onClick={handleInactivateUser}>
              Inactivate User
            </button>
          </div>
        )}
        {hasActiveBookings && (
          <div className="editProfileLogoutSection section">
            <p>You cannot inactivate your user while there are active bookings ahead.</p>
          </div>
        )}
        <div className="editProfileLogoutSection section">
          <button className="cta-button danger" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
        }
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import bookingService from "../../services/bookingService";
import SingleImageUpload from "../../components/SingleUpload/SingleImageUpload";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";

export default function EditProfile() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useAuth();
  const [avatarImage, setAvatarImage] = useState("");
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [hasActiveBookings, setHasActiveBookings] = useState(false);
  const navigate = useNavigate();

  const handleAvatarUpload = (imageData) => {
    setAvatarImage(imageData);
  };

  const handleSaveAvatar = async () => {
    try {
      await userService.updateUser({
        ...user,
        avatar: avatarImage,
        email,
        username,
      });
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

  const handleSave = async () => {
    try {
      await userService.updateUser({
        ...user,
        email,
        username,
      });
      toast.success("Changes saved successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkActiveBookings = async () => {
      try {
        const bookings = await bookingService.getAllBookings();
        const confirmedBookings = bookings.filter(
          (booking) => booking.status === "confirmed"
        );
        const hasActiveBookings = confirmedBookings.length > 0;
        setHasActiveBookings(hasActiveBookings);
      } catch (error) {
        console.error(error);
      }
    };

    checkActiveBookings();
  }, [user._id]);

  const handleInactivateUser = async () => {
    try {
      const updatedUser = { ...user, status: "inactive" };
      await userService.updateUser(updatedUser);
      logOutUser();
      toast.success("User successfully inactivated! See you soon", {
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
            <div className="editProfileInfo section">
  <div style={{ marginBottom: "1rem" }}>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{ display: "block" }}
    />
  </div>
  <div>
    <label htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{ display: "block" }}
    />
  </div>
</div>
</div>
            <div>
              <button className="cta-button full100" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
        {user.status === "active" && !hasActiveBookings && (
          <div className="editProfileLogoutSection section">
            <button
              className="cta-button danger full100 top90"
              onClick={handleInactivateUser}
            >
              Inactivate User
            </button>
          </div>
        )}
        {hasActiveBookings && (
          <div className="editProfileLogoutSection section">
            <p>
              You cannot inactivate your user while there are active bookings
              ahead.
            </p>
          </div>
        )}
        <div className="editProfileLogoutSection section">
          <button
            className="cta-button danger full100 top90"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

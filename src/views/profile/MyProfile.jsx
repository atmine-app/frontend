import React from "react";
import { RxUpload } from "react-icons/rx";
import { HiOutlineBookOpen } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";

export default function MyProfile() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleYourReservations = () => {
    navigate("/properties/bookings");
  };

  const handleHosting = () => {
    navigate("/register-property");
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="profileContainer">
        <div className="profileHeader">
          <h1 className="profileTitle">Profile</h1>
        </div>
        <div className="profileBody">
          <div className="profileSection section" onClick={handleEditProfile}>
            <RxAvatar className="profileIcon" />
            <h2 className="profileSectionTitle">Personal Information</h2>
            <p>Provide personal details and how we can reach you</p>
          </div>
          <div
            className="profileSection section"
            onClick={handleYourReservations}
          >
            <HiOutlineBookOpen className="profileIcon" />
            <h2 className="profileSectionTitle">Your reservations</h2>
            <p>Manage your property bookings</p>
          </div>
          <div className="profileSection section" onClick={handleHosting}>
            <RxUpload className="profileIcon" />
            <h2 className="profileSectionTitle">Hosting</h2>
            <p>List your space here and start earning money with us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

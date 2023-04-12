import React, { useState, useEffect } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";
import propertyService from "../../services/propertyService";

export default function MyProfile() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await propertyService.getProperty(propertyId);
        setProperty(propertyData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleEditProperty = () => {
    navigate(`/profile/properties/${propertyId}/edit`);
  };

  const handleYourBookings = () => {
    navigate(`/profile/properties/${propertyId}/bookings`);
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="profileContainer">
        <div className="profileHeader">
          <h1 className="profileTitle">{property?.title} details</h1>
        </div>
        <div className="profileBody">
          <div className="profileSection section" onClick={handleEditProperty}>
            <FiEdit className="profileIcon" />
            <h2 className="profileSectionTitle">Edit Property</h2>
            <p>Manage and edit your property details</p>
          </div>
          <div
            className="profileSection section"
            onClick={handleYourBookings}
          >
            <HiOutlineBookOpen className="profileIcon" />
            <h2 className="profileSectionTitle">Manage Bookings</h2>
            <p>Manage your property bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
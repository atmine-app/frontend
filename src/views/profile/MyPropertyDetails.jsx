import React, { useState, useEffect } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import "./MyProfile.css";
import propertyService from "../../services/propertyService";
import bookingService from "../../services/bookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "../../components/Calendar/Calendar";
import addDays from "date-fns/addDays";

export default function MyProfile() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [hasActiveBookings, setHasActiveBookings] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await propertyService.getProperty(propertyId);
        setProperty(propertyData);
        const bookingsData = await bookingService.getAllBookings();
        const confirmedBookings = bookingsData.filter(
          (booking) =>
            booking.status === "confirmed" &&
            booking.propertyId === propertyId &&
            new Date(booking.checkInDate) > new Date()
        );
        setHasActiveBookings(confirmedBookings.length > 0);
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

  const handleDeactivateProperty = async () => {
    try {
      await propertyService.editProperty(propertyId, { active: false });
      setProperty({ ...property, active: false });
      toast.info("Property deactivated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivateProperty = async () => {
    try {
      await propertyService.editProperty(propertyId, { active: true });
      setProperty({ ...property, active: true });
      toast.success("Property activated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockRange = async (selectedRange) => {
    console.log("Selected range:", selectedRange);
    try {
      await bookingService.blockDateRange(
        propertyId,
        selectedRange.startDate,
        selectedRange.endDate
      );
      // Refresh the bookings and update the calendar after blocking the date range
      bookingService.getAllBookings();
    } catch (error) {
      console.error("Error blocking date range:", error);
    }
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
          <div className="profileSection section" onClick={handleYourBookings}>
            <HiOutlineBookOpen className="profileIcon" />
            <h2 className="profileSectionTitle">Manage Bookings</h2>
            <p>Manage your property bookings</p>
          </div>
          <div className="section">
            <Calendar
              propertyId={propertyId}
              className="section"
              property={property}
              onRangeChange={(newRange) => setSelectedRange(newRange)}
              isOwner={true}
              alwaysVisible={true}
            />
            <div className="profileSection">
              <button
                className="cta-button blockRange"
                onClick={() => handleBlockRange(selectedRange)} // Pass selectedRange here
              >
                Block
              </button>
              <h2 className="profileSectionTitle">Manage Availability</h2>
              <p>Manage your property availability</p>
            </div>
          </div>
          {property?.active ? (
            hasActiveBookings ? (
              <p>
                You cannot deactivate the property while you still have active
                bookings.
              </p>
            ) : (
              <button
                className="cta-button danger full100"
                onClick={handleDeactivateProperty}
              >
                Deactivate Property
              </button>
            )
          ) : (
            <button
              className="cta-button full100"
              onClick={handleActivateProperty}
            >
              Activate Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

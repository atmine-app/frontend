import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import propertyService from "../../services/propertyService";
import bookingService from "../../services/bookingService";
import "../booking/bookingList/BookingList.css";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import PropertyItem from "../property/PropertyItem";
import { RxUpload } from "react-icons/rx";
import NotFound from "../../components/NotFound/NotFound";
import RevenueSummaryTable from "./RevenueSummaryTable";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleHosting = () => {
    navigate("/register-property");
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchProperties = async () => {
      try {
        const allProperties = await propertyService.getAllProperties();
        const userProperties = allProperties.filter(
          (property) => property.owner._id === user._id
        );

        const allBookings = await bookingService.getAllBookings();
        const userBookings = allBookings.filter(
          (booking) =>
            booking.property &&
            userProperties.some(
              (property) => property._id === booking.property._id
            )
        );
        console.log("userBookings", userBookings);
        const propertyRevenues = userProperties.map((property) => {
          const propertyBookings = userBookings.filter(
            (booking) => booking.property._id === property._id
          );
          console.log("Property:", property.title, "Bookings:", propertyBookings); // Add this line
        
          const revenue = propertyBookings.reduce(
            (total, booking) => total + booking.totalPrice,
            0
          );
          const bookingCount = propertyBookings.length;
          return {
            property,
            revenue,
            bookingCount,
          };
        });

        setProperties(propertyRevenues);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, [user]);

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>My Properties</h2>
        <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Revenue Summary
        </h3>
        <RevenueSummaryTable
          properties={properties
            .filter(({ bookingCount }) => bookingCount > 0)
            .filter(({ revenue }) => !isNaN(revenue) && revenue > 0)}
        />
        <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Property Listings
        </h3>
        {properties.length > 0 ? (
          <ul>
            {properties.map(({ property }) => (
              <Link
                to={`/profile/properties/${property._id}`}
                key={property._id}
              >
                <li className="booking-list__item" key={property._id}>
                  <PropertyItem property={property} />
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <>
            <p>No properties found.</p>
            <NotFound />
            <div className="profileSection section" onClick={handleHosting}>
              <RxUpload className="profileIcon" />
              <h2 className="profileSectionTitle">Hosting</h2>
              <p>List your space here and start earning money with us</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProperties;

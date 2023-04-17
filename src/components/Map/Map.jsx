import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { CiLocationOn } from "react-icons/ci";
import categories from "../../data/categories";

const Map = ({ formData, onLocationChange = () => {} }) => {
  // set initial state for selectedLocation and center
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  // Add a ref to store the previous formData
  const prevFormDataRef = useRef(formData);

  useEffect(() => {
    // check if Google Maps API has loaded
    if (!window.google) return;

    // Check if formData has changed
    if (JSON.stringify(prevFormDataRef.current) === JSON.stringify(formData)) {
      return;
    }

    prevFormDataRef.current = formData;

    // initialize Geocoder object to convert address to coordinates
    const geocoder = new window.google.maps.Geocoder();
    const fullAddress = formData.address + ", " + formData.city;

    // call Geocoder to get coordinates of the address
    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        const coordinates = { lat: location.lat(), lng: location.lng() }; // create a new object
        setSelectedLocation(coordinates);
        setCenter(coordinates);
        onLocationChange(coordinates); // pass the new object to onLocationChange callback function
      } else {
        setSelectedLocation({ lat: null, lng: null }); // set selectedLocation state to null if Geocoder fails
      }
    });
  }, [formData, onLocationChange]);

  const getMarkerIcon = () => {
    const category = categories.find((cat) => cat.value === formData.category);
    if (!category) {
      return <CiLocationOn size={30} style={{color:"white"}}/>;
    }
    const IconComponent = category.icon;
    return <IconComponent size={30} style={{color:"white"}}/>;
  };

  const markerIcon = getMarkerIcon();

  const renderOverlayView = (position) => (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        style={{
          backgroundColor: "#60C2A4",
          borderRadius: "10px",
          padding: "5px 10px",
          border: "2px solid #605cb8",
          textAlign: "center",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        {markerIcon}
      </div>
    </OverlayView>
  );

  return center ? (
    <GoogleMap
      mapContainerStyle={{
        height: "400px",
        width: "90%",
        margin: "0 auto",
        borderRadius: "20px",
      }}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {selectedLocation &&
        selectedLocation.lat &&
        selectedLocation.lng &&
        renderOverlayView(selectedLocation)}
    </GoogleMap>
  ) : (
    <div>
      <p>Loading map...</p>
    </div>
  );
};
export default Map;

import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

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
       console.log(coordinates)
        setSelectedLocation(coordinates);
        setCenter(coordinates);
        onLocationChange(coordinates); // pass the new object to onLocationChange callback function
      } else {
        setSelectedLocation({ lat: null, lng: null }); // set selectedLocation state to null if Geocoder fails
      }
    });
  }, [formData, onLocationChange]);

  return center ? (
    // if center state is not null, return Google Map component with marker at selectedLocation
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={center}
      zoom={14}
      options={{
        disableDefaultUI: true,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
        <Marker position={selectedLocation} />
      )}
    </GoogleMap>
  ) : (
    // if center state is null, display loading message or placeholder
    <div>
      <p>Loading map...</p>
    </div>
  );
};

export default Map;

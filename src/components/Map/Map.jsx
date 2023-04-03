import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { googleMapsConfig } from "../../googleMapsConfig";

const Map = ({ formData, onLocationChange = () => {} }) => {
  // set initial state for selectedLocation and center
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  useEffect(() => {
    // check if Google Maps API has loaded
    if (!window.google) return;

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

  return (
    <LoadScript
      googleMapsApiKey={googleMapsConfig.apiKey}
      libraries={googleMapsConfig.libraries}
      onLoad={() => console.log("Google Maps API loaded")} // optional callback to handle API load
      onError={() => console.log("Error loading Google Maps API")} // optional callback to handle API error
    >
      {center ? ( // if center state is not null, return Google Map component with marker at selectedLocation
        <GoogleMap
          mapContainerStyle={{ height: "200px", width: "100%" }}
          center={center}
          zoom={13}
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
      )}
    </LoadScript>
  );
};

export default Map;

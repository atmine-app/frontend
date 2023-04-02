import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { googleMapsConfig } from "../../googleMapsConfig";

const Map = ({ formData }) => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null});
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  useEffect(() => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    const fullAddress = formData.address + ", " + formData.city;
    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        console.log(location.lat(), location.lng());
        setSelectedLocation({ lat: location.lat(), lng: location.lng() });
        setCenter({ lat: location.lat(), lng: location.lng() });
      } else {
        setSelectedLocation({ lat: null, lng: null });
      }
    });
  }, [formData]);

  return center ? (
    <LoadScript googleMapsApiKey={googleMapsConfig.apiKey} libraries={googleMapsConfig.libraries}>
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
        {selectedLocation.lat !== null && selectedLocation.lng !== null && (
  <Marker position={selectedLocation} />
)}
      </GoogleMap>
    </LoadScript>
  ) : (
    <div>
      {/* You can display a placeholder or a loading spinner here */}
      <p>Loading map...</p>
    </div>
  );
};

export default Map;

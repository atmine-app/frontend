import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { googleMapsConfig } from "../../googleMapsConfig";

const Map = ({ address }) => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null});
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  useEffect(() => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setSelectedLocation({ lat: location.lat(), lng: location.lng() });
        setCenter({ lat: location.lat(), lng: location.lng() });
        console.log("location", location)
      } else {
        setSelectedLocation({ lat: null, lng: null });
        console.log("location", JSON.stringify(status))
      }
    });
  }, [address]);

  return center ? (
    <LoadScript googleMapsApiKey={googleMapsConfig.apiKey} libraries={googleMapsConfig.libraries}>
      <GoogleMap
        mapContainerStyle={{ height: "200px", width: "100%" }}
        center={center}
        zoom={15}
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

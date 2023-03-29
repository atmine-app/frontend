import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ center, selectedLocation, locations }) => {
  return (
    <GoogleMap
      mapContainerStyle={{ height: "200px", width: "100%" }}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
      }}
    >
      {selectedLocation && (
        <Marker position={selectedLocation} />
      )}
    </GoogleMap>
  );
};

export default Map;

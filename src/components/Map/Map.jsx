import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ locations ,center, selectedLocation}) => {
    console.log(locations)
  
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
      {locations && locations.map((location, index) => (
        <Marker key={index} position={{lat: location.coordinates.lat, lng: location.coordinates.lng}} />
      ))}
    </GoogleMap>
  );
};

export default Map;

import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { googleMapsConfig } from "../../googleMapsConfig";

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={googleMapsConfig.apiKey}
      libraries={googleMapsConfig.libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;

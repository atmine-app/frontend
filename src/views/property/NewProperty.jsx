import React, { useState } from "react";
import RegisterPropertyForm from "../../components/RegisterPropertyForm/RegisterPropertyForm";
import Map from "../../components/Map/Map";
import GoogleMapsProvider from "../../components/GoogleMapsProvider/GoogleMapsProvider";
import "./NewProperty.css";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";

export default function NewProperty() {
  const [formData, setFormData] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleLocationChange = (coordinates) => {
    setCoordinates(coordinates);
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="contentWrapper">
        <GoogleMapsProvider>
          <RegisterPropertyForm
            onFormDataChange={handleFormChange}
            coordinates={coordinates}
          />
          <label id="map-container-register">
            <Map formData={formData} onLocationChange={handleLocationChange} />
          </label>
        </GoogleMapsProvider>
      </div>
    </div>
  );
}

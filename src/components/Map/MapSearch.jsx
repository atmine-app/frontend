import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView,
  LoadScript,
} from "@react-google-maps/api";
import { googleMapsConfig } from "../../googleMapsConfig";

const MapSearch = ({ center, properties }) => {
  const customMapStyle = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    setMarkers([]);
    const newMarkers = properties.map((property, index) => {
      const marker = (
        <OverlayView
          key={index}
          position={{
            lat: property.coordinates.lat,
            lng: property.coordinates.lng,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "5px 10px",
              border: "2px solid #60C2A4",
              width: "50px",
              textAlign: "center",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => onMarkerClick(property)}
          >
            €{property.price}
          </div>
        </OverlayView>
      );
      return marker;
    });
    setMarkers(newMarkers);
  }, [properties]);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsConfig.apiKey}
      libraries={googleMapsConfig.libraries}
    >
      <div className="App">
        <GoogleMap
          mapContainerStyle={{ height: "200px", width: "100%" }}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true,
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            styles: customMapStyle,
          }}
        >
          {markers}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.coordinates.lat,
                lng: selectedMarker.coordinates.lng,
              }}
              onCloseClick={onCloseInfoWindow}
              className="info-window"
              zIndex={999}
            >
              <div>
                <h3>{selectedMarker.title}</h3>
                <p>Price: €{selectedMarker.price}</p>
                <p>{selectedMarker.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapSearch;

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./MapSearch.css";

const MapSearch = ({ properties }) => {
  const customMapStyle = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({
    lat: properties[0].coordinates.lat,
    lng: properties[0].coordinates.lng,
  });

  useEffect(() => {
    if (properties.length > 0) {
      setCenter({
        lat: properties[0].coordinates.lat,
        lng: properties[0].coordinates.lng,
      });
    }
  }, [properties]);

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
    return () => {
        if (window.google) {
          window.google.maps.event.clearInstanceListeners(window.google);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  return (
      <div className="map-search-container expand">
        <GoogleMap
          mapContainerStyle={{ height: "210px", width: "100%" }}
          center={center}
          zoom={12}
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
                <img className="info-window-image" src={selectedMarker.images[0]} alt="property" />
                <h3>{selectedMarker.title}</h3>
                <p>Price: €{selectedMarker.price}</p>
                <p>{selectedMarker.description}</p>
                <Link to={`/properties/${selectedMarker._id}`}>
                    View Property
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
  );
};

export default MapSearch;

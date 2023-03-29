import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const MapSearch = ({ center, locations, isLoaded }) => {
  console.log(locations);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const onCloseInfoWindow = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    // Clear existing markers
    setMarkers([]);
    const newMarkers = locations.map((location, index) => {
        const marker = (
        <Marker
        key={index}
        position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
        onClick={() => onMarkerClick(location)}
        />
        );
        return marker;
        });
        setMarkers(newMarkers);
    }, [locations]);

    return (
        <div className="App">
        {!isLoaded ? (
        <h1>Loading...</h1>
        ) : (
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
        {markers}
        {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={onCloseInfoWindow}
                className="info-window"
                zIndex={999}
              >
                <div>
                  <h3>{selectedMarker.name}</h3>
                  <p>{selectedMarker.description}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    );
  };
  

  export default MapSearch;
import React from "react";
import propertyService from "../services/propertyService";
import { useState, useEffect } from "react";
import CardMin from "../components/Card/CardMin";
import SearchBar from "../components/Search/SearchBar";
import MapSearch from "../components/Map/MapSearch";
// import { googleMapsConfig } from "../googleMapsConfig";
// import { useJsApiLoader } from "@react-google-maps/api";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  // const { isLoaded, loadError } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: googleMapsConfig.apiKey,
  //   libraries: googleMapsConfig.libraries,
  // });

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const getAllProperties = async () => {
    try {
      const response = await propertyService.getAllProperties();
      response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProperties(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filteredProperties = properties
        .filter(
          (property) =>
            property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            property.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            property.category.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFilteredProperties(filteredProperties);
    } else {
      setFilteredProperties(properties);
    }
  }, [searchValue, properties]);

  // if (loadError) return "Error loading maps";
  //   if (!isLoaded) return "Loading maps";

  return (
    <div>
      <SearchBar handleSearchValue={handleSearch} />
      {searchValue && filteredProperties.length > 0 && (
  <div style={{ height: "200px" }}>
    <MapSearch
      center={{
        lat: filteredProperties[0].coordinates.lat,
        lng: filteredProperties[0].coordinates.lng,
      }}
      properties={filteredProperties}
    />
  </div>
)}
      <h1>All Properties</h1>
      <div className="card__container">
        {properties !== null ? (
          <div className="card__container">
            {filteredProperties.map((property) => {
              return (
                <div key={property._id}>
                  <CardMin property={property} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading properties...</div>
        )}
      </div>
    </div>
  );
}

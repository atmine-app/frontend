import React from "react";
import propertyService from "../services/propertyService";
import { useState, useEffect } from "react";
import CardMin from "../components/Card/CardMin";
import SearchBar from "../components/Search/SearchBar";
import MapSearch from "../components/Map/MapSearch";
import GoogleMapsProvider from "../components/GoogleMapsProvider/GoogleMapsProvider";


export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mapVisible, setMapVisible] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMapVisible(true);
  };

  
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
    let filtered = properties;
  
    if (searchValue) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        property.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        property.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  
    if (selectedCategory) {
      console.log('selected category',selectedCategory)
      filtered = filtered.filter((property) => property.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    console.log('filtered',filtered)
    setFilteredProperties(filtered);
  }, [searchValue, properties, selectedCategory]);

  return (
    <div>
      <SearchBar handleSearchValue={handleSearch} handleCategorySelect={handleCategorySelect} />

      {(searchValue|| mapVisible) && filteredProperties.length > 0 && (
        <div style={{ height: "200px" }}>
          <GoogleMapsProvider>
            <MapSearch
              center={{
                lat: filteredProperties[0].coordinates.lat,
                lng: filteredProperties[0].coordinates.lng,
              }}
              properties={filteredProperties}
            />
          </GoogleMapsProvider>
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

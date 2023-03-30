import React from 'react'
import propertyService from '../services/propertyService'
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card';
import SearchBar from '../components/Search/SearchBar';
import MapSearch from '../components/Map/MapSearch';
import { googleMapsConfig } from '../googleMapsConfig';
import { useJsApiLoader } from "@react-google-maps/api";

export default function Properties() {
  const [properties, setProperties] = useState(null);
  const [searchValue, setSearchValue] = useState('');

const { isLoaded, loadError } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: googleMapsConfig.apiKey,
  libraries: googleMapsConfig.libraries,
});

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const getAllProperties = async () => {
    try {
      const response = await propertyService.getAllProperties();
      setProperties(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProperties()
  }, [])

if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const filteredProperties = properties
    ? properties.filter((property) =>
        property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        property.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        property.category.toLowerCase().includes(searchValue.toLowerCase())
      ): null;
  
  return (
    <div>
    <SearchBar handleSearchValue={handleSearch} />
    {searchValue && filteredProperties.length > 0 && (
  <div style={{ height: "200px" }}>
    <MapSearch
      center={filteredProperties[0].coordinates}
      locations={filteredProperties}
      isLoaded={isLoaded}
    />
  </div>
)}
    <h1>All Properties</h1>
    <div className="card__container">
    {filteredProperties !== null
  ? filteredProperties.map((property) => {
      return (
        <div key={property._id}>
          <Card property={property} />
        </div>
      );
    })
  : null}
    </div>
  </div>
  );
}

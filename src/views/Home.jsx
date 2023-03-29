import React from 'react'
import propertyService from '../services/propertyService'
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card';
import SearchBar from '../components/Search/SearchBar';
import Map from '../components/Map/Map';
import { googleMapsConfig } from '../googleMapsConfig';
import { useLoadScript } from '@react-google-maps/api';
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

  return (
    <div>
    <SearchBar handleSearchValue={handleSearch} />
    {searchValue && <div style={{ height: "200px" }}>
  <Map center={properties[0].coordinates} locations={properties} />
</div>}
    <h1>All Properties</h1>
    <div className="card__container">
      {properties &&
        properties
          .filter(
            (property) =>
              property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              property.description.toLowerCase().includes(searchValue.toLowerCase()) ||
              property.category.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((property) => {
            return (
              <div key={property._id}>
                <Card property={property} />
              </div>
            );
          })}
    </div>
  </div>
  );
}

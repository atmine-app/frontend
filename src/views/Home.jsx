import React from 'react'
import propertyService from '../services/propertyService'
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card';
import SearchBar from '../components/Search/SearchBar';

export default function Properties() {
  const [properties, setProperties] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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

  return (
    <div>
    <SearchBar handleSearchValue={handleSearch} />
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

import React from "react";
import propertyService from "../services/propertyService";
import { useState, useEffect } from "react";
import CardMin from "../components/Card/CardMin";
import SearchBar from "../components/Search/SearchBar";
import MapSearch from "../components/Map/MapSearch";
import GoogleMapsProvider from "../components/GoogleMapsProvider/GoogleMapsProvider";
import SearchFilter from "../components/Search/SearchFilter";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    minRating: 0,
    selectedCategories: [],
    selectedAmenities: [],
  });

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    setMapVisible(!mapVisible);
  };

  const applyFilters = (appliedFilters) => {
    setFilters({ ...filters, ...appliedFilters });
    setShowFilter(false);
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMapVisible(true);
    setFilters({
      priceRange: [0, 1000],
      minRating: 0,
      selectedCategories: [],
      selectedAmenities: [],
    });
  };

  const closeFilter = () => {
    setShowFilter(false);
    setMapVisible(false);
    setFilters({
      priceRange: [0, 1000],
      minRating: 0,
      selectedCategories: [],
      selectedAmenities: [],
    });
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
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.description
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          property.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (property) =>
          property.category.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (property) =>
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1]
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(
        (property) => property.averageRating >= filters.minRating
      );
    }

    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
      filtered = filtered.filter((property) =>
        filters.selectedCategories.includes(property.category.toLowerCase())
      );
    }

    if (filters.selectedAmenities && filters.selectedAmenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.selectedAmenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
      );
    }

    if (filters.city) {
      filtered = filtered.filter(
        (property) => property.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
    console.log(filtered);
  }, [searchValue, properties, filters]);

  return (
    <div>
      <SearchBar
        className="searchBarContainer"
        handleSearchValue={handleSearch}
        handleCategorySelect={handleCategorySelect}
        handleFilterClick={handleFilterClick}
      />
      <SearchFilter
        isOpen={showFilter}
        applyFilters={applyFilters}
        closeFilter={closeFilter}
        categories={filters.categories}
        amenities={filters.amenities}
        cities={filters.cities}
        filters={filters}
        setFilters={setFilters}
      />

      {(searchValue || mapVisible) &&
        filteredProperties.length > 0 &&
        filteredProperties[0].coordinates && (
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

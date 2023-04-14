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
    setMapVisible(true);
  };

  const applyFilters = (appliedFilters) => {
    setFilters({ ...filters, ...appliedFilters });
    setShowFilter(false);
  };

  const handleCategorySelect = (category) => {
    if (category === "all") {
      setSelectedCategory("");
      setMapVisible(false); // Close the map when "All" is pressed
      setFilters({ // Clear the filters
        priceRange: [0, 1000],
        minRating: 0,
        selectedCategories: [],
        selectedAmenities: [],
      });
    } else {
      setSelectedCategory(category);
      setMapVisible(true);
      setFilters({
        priceRange: [0, 1000],
        minRating: 0,
        selectedCategories: [],
        selectedAmenities: [],
      });
    }
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
    return ()=>{
      setSelectedCategory("");
     }
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
          property.category.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.city.toLowerCase().includes(searchValue.toLowerCase())
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
  }, [searchValue, properties, filters,selectedCategory]);

  return (
    <div>
      <div className="sticky__searchBar">
      <SearchBar
        className="searchBarContainer"
        handleSearchValue={handleSearch}
        handleCategorySelect={handleCategorySelect}
        handleFilterClick={handleFilterClick}
      />
       </div>
      <SearchFilter
       className="search-filter-container"
        isOpen={showFilter}
        applyFilters={applyFilters}
        closeFilter={closeFilter}
        categories={filters.categories}
        amenities={filters.amenities}
        cities={filters.cities}
        filters={filters}
        setFilters={setFilters}
      />
     
      

      <div className="map-and-cards-container">
      {(searchValue || mapVisible) &&
        filteredProperties.length > 0 &&
        filteredProperties[0].coordinates && (
          <GoogleMapsProvider>
            <MapSearch
              center={{
                lat: filteredProperties[0].coordinates.lat,
                lng: filteredProperties[0].coordinates.lng,
              }}
              properties={filteredProperties}
            />
          </GoogleMapsProvider>
        )}
      <div>
        {properties !== null ? (
          <div className="cards-flex">
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
  </div>
);
}

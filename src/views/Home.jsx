import React from "react";
import propertyService from "../services/propertyService";
import { useState, useEffect } from "react";
import CardMin from "../components/Card/CardMin";
import SearchBar from "../components/Search/SearchBar";
import MapSearch from "../components/Map/MapSearch";
import GoogleMapsProvider from "../components/GoogleMapsProvider/GoogleMapsProvider";
import SearchFilter from "../components/Search/SearchFilter";
import { removeAccents } from "../utils";
import NotFound from "../components/NotFound/NotFound";
import { PuffLoader } from "react-spinners";

export default function Properties() {
  // State variables
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    minRating: 0,
    selectedCategories: [],
    selectedAmenities: [],
  });

  // Check if filters are empty
  const areFiltersEmpty = () => {
    const {
      priceRange,
      minRating,
      selectedCategories,
      selectedAmenities,
      city,
    } = filters;
    return (
      priceRange[0] === 0 &&
      priceRange[1] === 1000 &&
      minRating === 0 &&
      selectedCategories.length === 0 &&
      selectedAmenities.length === 0 &&
      !city
    );
  };

  // Toggle filter visibility and handle map visibility based on filter conditions
  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    if (mapVisible && areFiltersEmpty()) {
      setMapVisible(false);
    } else {
      setMapVisible(true);
    }
  };

  // Apply filters and handle map visibility based on applied filters
  const applyFilters = (appliedFilters) => {
    setFilters({ ...filters, ...appliedFilters });
    setShowFilter(false);
    if (
      Object.values(appliedFilters).some(
        (filter) => filter && filter.length > 0
      )
    ) {
      setMapVisible(true);
    }
  };

  // Handle category selection and map visibility
  const handleCategorySelect = (category) => {
    if (category === "all") {
      setSelectedCategory("");
      setMapVisible(false);
      setMapVisible(false);
      setShowFilter(false);
      setFilters({
        // Clear the filters
        priceRange: [0, 300],
        minRating: 0,
        selectedCategories: [],
        selectedAmenities: [],
      });
    } else {
      setSelectedCategory(category);
      setMapVisible(true);
      setFilters({
        priceRange: [0, 300],
        minRating: 0,
        selectedCategories: [],
        selectedAmenities: [],
      });
    }
  };

  // Close filter and reset state variables
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

  // Scroll to top when map is visible
  useEffect(() => {
    if (mapVisible) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filters, selectedCategory, searchValue, mapVisible]);

  // Handle search input value
  const handleSearch = (value) => {
    setSearchValue(value);
  };

  // Fetch all properties
  const getAllProperties = async () => {
    setIsLoading(true);
    try {
      const response = await propertyService.getAllProperties();
      const activeProperties = response.filter((property) => property.active);
      activeProperties.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProperties(activeProperties);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Get all properties when component mounts
  useEffect(() => {
    getAllProperties();
    return () => {
      setSelectedCategory("");
    };
  }, []);

  // Filter properties based on searchValue, filters, and selectedCategory
  useEffect(() => {
    let filtered = properties;
    const searchValueNoAccents = removeAccents(searchValue).toLowerCase();
    const searchTerms = searchValue ? searchValueNoAccents.split(" ") : [];

    if (searchTerms.length > 0) {
      filtered = filtered.filter((property) => {
        return searchTerms.every((term) => {
          return (
            removeAccents(property.title.toLowerCase()).includes(term) ||
            removeAccents(property.description.toLowerCase()).includes(term) ||
            removeAccents(property.category.toLowerCase()).includes(term) ||
            removeAccents(property.city.toLowerCase()).includes(term)
          );
        });
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (property) =>
          property.category.toLowerCase() === selectedCategory.toLowerCase()
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
  }, [searchValue, properties, filters, selectedCategory]);

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
        {isLoading ? (
          <div className="loading-container">
            <PuffLoader color="#ffffff" size={80} />
          </div>
        ) : (
          filteredProperties.length === 0 && <NotFound />
        )}
        <div className="cards-flex">
          {filteredProperties.map((property) => {
            return (
              <div key={property._id}>
                <CardMin property={property} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

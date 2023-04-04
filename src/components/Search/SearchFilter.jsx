import React from "react";

import {
  FaCar,
  FaWarehouse,
  FaTree,
  FaHome,
  FaSwimmingPool,
  FaUtensils,
  FaCamera,
  FaPlusSquare,
} from "react-icons/fa";
import {
  FaWifi,
  FaMusic,
  FaTv,
  FaWind,
  FaBurn,
  FaSnowflake,
  FaTshirt,
  FaDog,
  FaSmoking,
  FaChild,
  FaGlassCheers,
  FaQuestion,
} from "react-icons/fa";

const categoryIcons = {
  parking: <FaCar />,
  storage: <FaWarehouse />,
  garden: <FaTree />,
  garage: <FaHome />,
  basement: <FaHome />,
  attic: <FaHome />,
  pool: <FaSwimmingPool />,
  barbecue: <FaUtensils />,
  photostudio: <FaCamera />,
  other: <FaPlusSquare />,
};

const amenitiesIcons = {
  wifi: <FaWifi />,
  music: <FaMusic />,
  tv: <FaTv />,
  airConditioning: <FaWind />,
  heating: <FaBurn />,
  washer: <FaSnowflake />,
  dryer: <FaTshirt />,
  elevator: <FaDog />,
  petFriendly: <FaDog />,
  smokingAllowed: <FaSmoking />,
  kidFriendly: <FaChild />,
  eventFriendly: <FaGlassCheers />,
  other: <FaQuestion />,
};

const SearchFilter = ({
  isOpen,
  applyFilters,
  closeFilter,
  filters,
  setFilters,
}) => {
  const handleApplyFilters = () => {
    applyFilters(filters);
  };
 
  if (!isOpen) return null;

  return (
    <div className="search-filter">
      <div>
        <h3>Price range</h3>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[0]}
          onChange={(e) =>
            setFilters({
              ...filters,
              priceRange: [parseInt(e.target.value), filters.priceRange[1]],
            })
          }
        />
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)],
            })
          }
        />
        <p>
          {filters.priceRange[0]} - {filters.priceRange[1]}
        </p>
      </div>
      <div>
        <h3>Minimum rating</h3>
        <input
          type="range"
          min="0"
          max="5"
          value={filters.minRating}
          onChange={(e) =>
            setFilters({ ...filters, minRating: parseInt(e.target.value) })
          }
        />
        <p>{filters.minRating}</p>
      </div>
      <div>
        <h3>Category</h3>
        {Object.entries(categoryIcons).map(([key, icon]) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.selectedCategories.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({
                    ...filters,
                    selectedCategories: [...filters.selectedCategories, key],
                  });
                } else {
                  setFilters({
                    ...filters,
                    selectedCategories: filters.selectedCategories.filter(
                      (cat) => cat !== key
                    ),
                  });
                }
              }}
            />
            {icon} {key}
          </label>
        ))}
      </div>
      <div>
        <h3>Amenities</h3>
        {Object.entries(amenitiesIcons).map(([key, icon]) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={filters.selectedAmenities.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({
                    ...filters,
                    selectedAmenities: [...filters.selectedAmenities, key],
                  });
                } else {
                  setFilters({
                    ...filters,
                    selectedAmenities: filters.selectedAmenities.filter(
                      (amenity) => amenity !== key
                    ),
                  });
                }
              }}
            />
            {icon} {key}
          </label>
        ))}
      </div>

      {/* <div>
    <h3>City</h3>
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option
value="">Select a city</option>
{cities.map((city) => (
<option key={city} value={city}>
{city}
</option>
))}
</select>
</div> */}
      <button onClick={handleApplyFilters}>Apply filters</button>
      <button onClick={closeFilter}>Close</button>
    </div>
  );
};

export default SearchFilter;

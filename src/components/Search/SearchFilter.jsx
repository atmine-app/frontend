
import React, {useState} from "react";

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
  categories,
  amenities,
  cities,
}) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const [city, setCity] = React.useState("");


  const handleApplyFilters = () => {
    applyFilters({
      priceRange,
      minRating,
      selectedCategories,
      selectedAmenities,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="search-filter">
      <h2>Filter</h2>
      <div>
        <h3>Price range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([parseInt(e.target.value), priceRange[1]])
          }
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
        />
        <p>
          {priceRange[0]} - {priceRange[1]}
        </p>
      </div>
      <div>
        <h3>Minimum rating</h3>
        <input
          type="range"
          min="0"
          max="5"
          value={minRating}
          onChange={(e) => setMinRating(parseInt(e.target.value))}
        />
        <p>{minRating}</p>
      </div>
      <div>
        <h3>Category</h3>
        {Object.entries(categoryIcons).map(([key, icon]) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, key]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((cat) => cat !== key)
                  );
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
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedAmenities([...selectedAmenities, key]);
                } else {
                  setSelectedAmenities(
                    selectedAmenities.filter((amenity) => amenity !== key)
                  );
                }
              }}
            />
            {icon} {key}
          </label>
        ))}
      </div>

      <div>
        {/* <h3>City</h3>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select> */}
      </div>

      <button onClick={handleApplyFilters}>Apply filters</button>
      <button onClick={closeFilter}>Close</button>
    </div>
  );
};

export default SearchFilter;

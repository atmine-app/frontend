import amenities from "../../data/amenities";
import "./Search.css";

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
  const handlePriceRangeChange = (minPrice, maxPrice) => {
    setFilters({
      ...filters,
      priceRange: [minPrice, maxPrice],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="search-filter expand">
      <div>
        <h3>Price range</h3>
        <div className="price-range-content">
          <div>
            <label>Min</label>
            <p>{filters.priceRange[0]}€</p>
          </div>
          <div>
            <label>Max</label>
            <p>{filters.priceRange[1]}€</p>
          </div>
        </div>
        <div className="price-range-slider">
          <input
            type="range"
            className="min-price"
            min="0"
            max="200"
            value={filters.priceRange[0]}
            onChange={(e) => {
              const minPrice = parseInt(e.target.value);
              const maxPrice = Math.max(minPrice, filters.priceRange[1]);
              handlePriceRangeChange(minPrice, maxPrice);
            }}
          />
          <input
            type="range"
            className="max-price"
            min="0"
            max="200"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const maxPrice = parseInt(e.target.value);
              const minPrice = Math.min(filters.priceRange[0], maxPrice);
              handlePriceRangeChange(minPrice, maxPrice);
            }}
          />
        </div>
      </div>
      <div className="rating-filter-container">
        <h3>Minimum rating</h3>
        <p>{filters.minRating.toFixed(1)}</p>
        <input
          className="rating-filter-slider"
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={filters.minRating}
          onChange={(e) =>
            setFilters({ ...filters, minRating: parseFloat(e.target.value) })
          }
        />
      </div>

      <div>
        <h3>Amenities</h3>
        <div className="two-columns">
          {amenities.map(({ value, label, icon: IconComponent }) => (
            <label key={value}>
              <input
                type="checkbox"
                value={value}
                checked={filters.selectedAmenities.includes(value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      selectedAmenities: [...filters.selectedAmenities, value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      selectedAmenities: filters.selectedAmenities.filter(
                        (amenity) => amenity !== value
                      ),
                    });
                  }
                }}
              />
              <IconComponent /> {label}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-buttons-container">
        <button onClick={closeFilter} className="cta-button danger">
          Close and clear
        </button>
        <button onClick={handleApplyFilters} className="cta-button">
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;

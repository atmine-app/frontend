import amenities from "../../data/amenities";


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
    <div className="search-filter expand">
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
        <h3>Amenities</h3>
        <div className="two-columns">
        {amenities.map(({ value, label, icon:IconComponent }) => (
          <label key={value} >
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

      <button onClick={handleApplyFilters}>Apply filters</button>
      <button onClick={closeFilter}>Close</button>
    </div>
  );
};

export default SearchFilter;

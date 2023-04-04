import { FaCar, FaSwimmingPool, FaWifi } from "react-icons/fa";
// Add more icons as needed

const SearchBar = (props) => {
  const { handleSearchValue, handleCategorySelect } = props;

  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };

  const handleIconClick = (category) => {
    handleCategorySelect(category);
    console.log(category)
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={handleChange}
        placeholder="What are you looking for?"
      />
      <FaCar onClick={() => handleIconClick("parking")} />
      <FaSwimmingPool onClick={() => handleIconClick("pool")} />
      <FaWifi onClick={() => handleIconClick("wifi")} />
      {/* Add more icons with respective onClick handlers as needed */}
    </div>
  );
};

export default SearchBar;
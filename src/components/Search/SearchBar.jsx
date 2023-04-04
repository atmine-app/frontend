import {
  FaCar,
  FaSwimmingPool,
  FaWarehouse,
  FaTree,
  FaHome,
  FaUtensils,
  FaCamera,
  FaPlusSquare,
} from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
import "./Search.css";
// Add more icons as needed

const SearchBar = (props) => {
  const { handleSearchValue, handleCategorySelect, handleFilterClick } = props;

  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };

  const handleIconClick = (category) => {
    handleCategorySelect(category);
    console.log(category);
  };

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

  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          onChange={handleChange}
          placeholder="What are you looking for?"
        />
        <button onClick={handleFilterClick}>
          <i className="fas fa-filter">
            <BsSliders />{" "}
          </i>
        </button>
      </div>
      <div className="searchCategoryContainer">
        {Object.keys(categoryIcons).map((category) => (
          <div key={category}>
            {categoryIcons[category]}{" "}
            <span onClick={() => handleIconClick(category)}>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchBar;

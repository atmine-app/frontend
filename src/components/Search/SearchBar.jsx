import React from "react";
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
    parking: <FaCar className="icon" />,
    storage: <FaWarehouse className="icon" />,
    garden: <FaTree className="icon" />,
    garage: <FaHome className="icon" />,
    basement: <FaHome className="icon" />,
    attic: <FaHome className="icon" />,
    pool: <FaSwimmingPool className="icon" />,
    barbecue: <FaUtensils className="icon" />,
    photostudio: <FaCamera className="icon" />,
    other: <FaPlusSquare className="icon" />,
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
            <BsSliders />
          </i>
        </button>
      </div>
      <div className="searchCategoryContainer">
        {Object.keys(categoryIcons).map((category) => (
          <div key={category} onClick={() => handleIconClick(category)}>
            {categoryIcons[category]}
            <span className="categoryText">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

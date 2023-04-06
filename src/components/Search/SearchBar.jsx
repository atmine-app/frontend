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
import { BiSliderAlt } from "react-icons/bi";
import "./Search.css";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../assets/atmine_small.png";

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
      <div className="header">
        <div className="logo-search-container">
          <img
            src={logo}
            alt="logo"
            style={{ width: "45px", height: "45px" }}
            className="navbar-logo"
          />
          <div className="search-bar">
            <div className="search-icon-div">
              <AiOutlineSearch className="search-icon" />
            </div>
            <input
              type="text"
              name="search"
              onChange={handleChange}
              placeholder="What are you looking for?"
            />
            <div className="search-icon-button">
            <button onClick={handleFilterClick}>
              
                <BiSliderAlt />
              
            </button>
            </div>
            
          </div>
        </div>
      </div>

      <div className="searchCategoryContainer">
        {Object.keys(categoryIcons).map((category) => (
          <div key={category} onClick={() => handleIconClick(category)}>
            <div className="categoryItem">
              {categoryIcons[category]}
              <span className="categoryText">{category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

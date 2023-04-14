import React, { useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import "./Search.css";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../assets/atmine_2.svg";
import categories from "../../data/categories";
import { AiOutlineAppstore } from "react-icons/ai";

const SearchBar = (props) => {
  const { handleSearchValue, handleCategorySelect, handleFilterClick } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };

  const handleIconClick = (category) => {
    handleCategorySelect(category);
    setSelectedCategory(category);
    console.log(category);
  };

  return (
    <div>
      <div className="header">
        <div className="logo-search-container">
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "40px", marginTop: "5px" }}
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
      <div
          className={`categoryItem ${
            selectedCategory === "all" ? "selected" : ""
          }`}
          onClick={() => handleIconClick("all")}
        >
          <AiOutlineAppstore className="icon" />
          <div className="categoryText">All</div>
        </div>
        {categories.map((category) => (
          <div
            key={category.value}
            onClick={() => handleIconClick(category.value)}
            className={`categoryItem ${
              selectedCategory === category.value ? "selected" : ""
            }`} 
          >
            <category.icon className="icon" />
            <span className="categoryText">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

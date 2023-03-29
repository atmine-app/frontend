import React from "react";

const SearchBar = (props) => {
    const { handleSearchValue } = props;

    const handleChange = (e) => {
        handleSearchValue(e.target.value);
    };

    return (
        <div>
         <input type="text" name="search" onChange={handleChange} placeholder="What are you looking for?" />
        </div>
    );
    }
export default SearchBar;
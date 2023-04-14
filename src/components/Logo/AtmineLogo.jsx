import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import purpleLogo from "../../assets/purple.svg";
import greenLogo from "../../assets/darkgreen.svg";

const AtmineLogo = ({ onClick, handleResetColors, color }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  const handleClick = () => {
    setIsClicked(true);
    setCurrentColor("green");
    onClick();
  };

  const handleAnimationEnd = () => {
    setIsClicked(false);
    handleResetColors();
  };

  useEffect(() => {
    setCurrentColor(color);
  }, [color, handleResetColors]);

  return (
    <img
      src={currentColor === "purple" ? purpleLogo : greenLogo}
      alt="Bookings"
      className="navIcon"
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};

AtmineLogo.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleResetColors: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default AtmineLogo;
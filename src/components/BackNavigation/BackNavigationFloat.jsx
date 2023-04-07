import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./BackNavigationFloat.css";

const BackNavigationFloat = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`back-navigation-float ${showBackButton ? "show" : ""}`}>
      <div id="back-navigation-btn" onClick={() => window.history.back()}>
        <FiArrowLeft />
      </div>
    </div>
  );
};

export default BackNavigationFloat;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './BackNavigation.css';

export default function BackNavigation() {
  const navigate = useNavigate();

  return (
    <div className="backNavigationContainer">
      <button className="backNavigationButton" onClick={() => navigate(-1)}>
        <FiArrowLeft className="backNavigationIcon" />
        <span className="backNavigationText">Back</span>
      </button>
    </div>
  );
}
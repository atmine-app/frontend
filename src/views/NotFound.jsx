import React from "react";
import { useLocation, Link } from "react-router-dom";
import NotFoundSvg from "../assets/not-found.svg";
import BackNavigationFloat from "../components/BackNavigation/BackNavigationFloat";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-container">
      <BackNavigationFloat />
      <div className="not-found-content">
        <img src={NotFoundSvg} alt="Not found" />
        <p>
          Sorry, there is no URL called {location.pathname} in this website. You
          might want to <Link to="/">go to the main site</Link>
        </p>
      </div>
    </div>
  );
}

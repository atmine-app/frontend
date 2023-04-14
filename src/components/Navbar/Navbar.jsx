
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiMessage } from "react-icons/bi";
import AtmineLogo from "../../components/Logo/AtmineLogo";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [bookingsColor, setBookingsColor] = useState("purple");

  useEffect(() => {
    const isPropertyDetailPage = /^\/properties\/[^/]+$/.test(
      window.location.pathname
    );
    setShowNavbar(!isPropertyDetailPage);
  }, []);

  const handleBookingsClick = () => {
    setBookingsColor("green");
  };

  const handleResetColors = () => {
    setBookingsColor("purple");
  };

  return (
    <>
      {showNavbar && (
        <nav className="navbar">
          <ul className="navbarList">
            <li>
              <NavLink to="/">
                <div className="navItem">
                  <AiOutlineSearch className="navIcon" />
                  Explore
                </div>
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to="/signup">
                  <div className="navItem">
                    <RxAvatar className="navIcon" />
                    Sign up
                  </div>
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/login">
                  <div className="navItem">
                    <RxAvatar className="navIcon" />
                    Login
                  </div>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/wishlist" onClick={handleResetColors}>
                  <div className="navItem">
                    <AiOutlineHeart className="navIcon" />
                    Wishlist
                  </div>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/bookings">
                  <div className="navItem">
                    <AtmineLogo
                      onClick={handleBookingsClick}
                      color={bookingsColor}
                      handleResetColors={handleResetColors}
                    />
                    Bookings
                  </div>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/messages" onClick={handleResetColors}>
                  <div className="navItem">
                    <BiMessage className="navIcon" />
                    Inbox
                  </div>
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/profile" onClick={handleResetColors}>
                  <div className="navItem">
                    <RxAvatar className="navIcon" />
                    Profile
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
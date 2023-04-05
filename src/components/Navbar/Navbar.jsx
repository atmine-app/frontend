import React, { useContext } from "react";
import { NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import { AiFillHome } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { HiUser } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  // const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul className="navbarList">
        <li>
          <NavLink to="/">
            <div className="navItem">
              <AiFillHome className="navIcon" />
              Home
            </div>
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/signup">
              <div className="navItem">
                <HiUser className="navIcon" />
                Sign up
              </div>
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login">
              <div className="navItem">
                <HiUser className="navIcon" />
                Login
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/profile">
              <div className="navItem">
                <HiUser className="navIcon" />
                Profile
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/bookings">
              <div className="navItem">
                <MdFavorite className="navIcon" />
                Saved
              </div>
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/register-property">
              <div className="navItem">
                <BsFillHouseAddFill className="navIcon" />
                Add 
              </div>
            </NavLink>
          </li>
        )}
        {/* <li>
          <button onClick={() => navigate(-1)}>Go back</button>
        </li> */}
      </ul>
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
export const Header = () => {
  return (
    <>
      <header>
        <div className="logo-container">
          <img src={assets.logo} alt="" />
        </div>
        <nav>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/menu">
            Menu
          </NavLink>
          <NavLink className="nav-link" to="/mobileapp">
            Mobile app
          </NavLink>
          <NavLink className="nav-link" to="/contactus">
            Contact Us
          </NavLink>
        </nav>
        <div className="head-right">
          <img src={assets.search_icon} alt="search_icon" />
          <img src={assets.basket_icon} alt="basket_icon" />
          <img src={assets.profile_icon} alt="profile_icon" />
        </div>
      </header>
    </>
  );
};

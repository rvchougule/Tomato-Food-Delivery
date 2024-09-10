import { useDispatch } from "react-redux";
import { assets, food_list } from "../assets/assets.js";
import { useEffect } from "react";
import { updateAllItems } from "../store/slices/itemsSlice";
import { Link } from "react-router-dom";
export const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAllItems(food_list));
  }, []);
  return (
    <>
      <header>
        <Link to="/">
          <div className="logo-container">
            <img src={assets.logo} alt="" />
          </div>
        </Link>
        <nav>
          <Link className="nav-link" to="/#hero-section">
            Home
          </Link>
          <Link className="nav-link" to="/#menu-explorer">
            Menu
          </Link>
          <Link className="nav-link" to="/#download-app">
            Mobile app
          </Link>
          <Link className="nav-link" to="/#footer">
            Contact Us
          </Link>
        </nav>
        <div className="head-right">
          <img src={assets.search_icon} alt="search_icon" />
          <Link to="/cart-basket">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>

          <img src={assets.profile_icon} alt="profile_icon" />
        </div>
      </header>
    </>
  );
};

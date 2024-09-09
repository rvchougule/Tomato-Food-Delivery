import { useDispatch } from "react-redux";
import { assets, food_list } from "../assets/assets.js";
import { useEffect } from "react";
import { updateAllItems } from "../store/slices/itemsSlice";
export const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAllItems(food_list));
  }, []);
  return (
    <>
      <header>
        <div className="logo-container">
          <img src={assets.logo} alt="" />
        </div>
        <nav>
          <a className="nav-link" href="#hero-section">
            Home
          </a>
          <a className="nav-link" href="#menu-explorer">
            Menu
          </a>
          <a className="nav-link" href="#download-app">
            Mobile app
          </a>
          <a className="nav-link" href="#footer">
            Contact Us
          </a>
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

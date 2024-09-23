import { useDispatch, useSelector } from "react-redux";
import { assets, food_list } from "../assets/assets.js";
import { useEffect, useState } from "react";
import { updateAllItems } from "../store/slices/itemsSlice";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal.jsx";

import "./Header.css";
import { fetchCartItems } from "../store/slices/cartSliceFirebase.js";
import {
  fetchUserProfile,
  signInModelOpen,
  signOut,
} from "../store/slices/userSlice.js";

export const Header = () => {
  const dispatch = useDispatch();

  const [profileBox, setProfileBox] = useState(false);
  // Access user profile from Redux state
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(updateAllItems(food_list));
    dispatch(fetchCartItems(userDetails?.uid));

    // console.log("User profile updated");
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <header>
        <div className="header_container">
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
            {/* <img src={assets.search_icon} alt="search_icon" /> */}
            <Link to="/cart-basket">
              <img src={assets.basket_icon} alt="basket_icon" />
            </Link>
            {!isAuthenticated ? (
              <span
                className="sign_in_btn"
                onClick={() => dispatch(signInModelOpen())}
              >
                Sign in
              </span>
            ) : (
              <img
                src={assets.profile_icon}
                alt="profile_icon"
                onClick={() => setProfileBox(true)}
              />
            )}
            {profileBox && (
              <div className="profile_box">
                <span onClick={() => setProfileBox(false)}>
                  {userDetails.user_name}
                  <h6 onClick={() => setProfileBox(false)}>&#10006;</h6>
                </span>
                {/* <span onClick={() => setProfileBox(false)}>Orders</span> */}
                <span
                  onClick={() => {
                    dispatch(signOut());
                    setProfileBox(false);
                  }}
                >
                  Log out{" "}
                  <img
                    className="logout"
                    src={assets.logout_icon}
                    alt=""
                    onClick={() => {
                      setProfileBox(false);
                    }}
                  />
                </span>
              </div>
            )}

            <SignUpModal />
          </div>
        </div>
      </header>
    </>
  );
};

import { useDispatch } from "react-redux";
import { assets, food_list } from "../assets/assets.js";
import { useEffect, useState } from "react";
import { updateAllItems } from "../store/slices/itemsSlice";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal.jsx";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "./Header.css";

export const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profileBox, setProfileBox] = useState(false);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      }
    });
  };

  useEffect(() => {
    dispatch(updateAllItems(food_list));
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      setUserDetails(null);
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
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
          {/* <img src={assets.search_icon} alt="search_icon" /> */}
          <Link to="/cart-basket">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          {!userDetails ? (
            <span className="sign_in_btn" onClick={() => setIsOpen(true)}>
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
                Rohan Chougule{" "}
                <h6 onClick={() => setProfileBox(false)}>&#10006;</h6>
              </span>
              <span onClick={() => setProfileBox(false)}>Orders</span>
              <span onClick={() => setProfileBox(false)}>
                Log out{" "}
                <img
                  className="logout"
                  src={assets.logout_icon}
                  alt=""
                  onClick={handleLogout}
                />
              </span>
            </div>
          )}

          <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </header>
    </>
  );
};

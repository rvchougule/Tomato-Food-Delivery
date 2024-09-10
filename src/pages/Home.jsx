import { useEffect, useState } from "react";
import { assets, menu_list } from "../assets/assets";
import { useSelector } from "react-redux";
import { getAllItems } from "../store/slices/itemsSlice";
import Card from "../components/card";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const productsList = useSelector(getAllItems);
  const [selectedMenu, setSelectedMenu] = useState("");

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // remove the '#' symbol
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleClick = (menu_name) => {
    setSelectedMenu(menu_name);
  };

  const filteredFoodList = selectedMenu
    ? productsList.filter((foodItem) =>
        foodItem.category.includes(selectedMenu)
      )
    : productsList;
  return (
    <>
      <section className="hero-section" id="hero-section">
        <div className="hero-container">
          <div className="hero-header">
            <h1>
              Order your
              <br />
              favorite food here
            </h1>
            <p>
              Choose from diverse menu featuring a delectable array of dishes
              crafted with the finest ingridients and culinary expertise. Our
              mission is to satisfy your cravings and elevate your dining
              experience, one delicious meal at a time.
            </p>
            <button>View Menu</button>
          </div>
        </div>
        <div className="menu-explorer" id="menu-explorer">
          <h1>Explore our menu</h1>
          <p>
            Choose from diverse menu featuring a delectable array of dishes
            crafted with the finest ingridients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="menu-container">
            {menu_list.map(({ menu_name, menu_image }, index) => {
              return (
                <div
                  className="food-menu"
                  key={index}
                  onClick={() => handleClick(menu_name)}
                >
                  <img
                    className={selectedMenu === menu_name ? "menu-circle" : ""}
                    src={menu_image}
                    alt={menu_name}
                  />
                  <h4>{menu_name}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="top-dishes">
          <h1>Top dishes near you</h1>
          <div className="card-container">
            {filteredFoodList.map((foodItem) => {
              return (
                <Card
                  key={foodItem._id}
                  itemId={foodItem._id}
                  image={foodItem.image}
                  name={foodItem.name}
                  description={foodItem.description}
                  price={foodItem.price}
                />
              );
            })}
          </div>
        </div>
        <div className="download-app" id="download-app">
          <h1>
            For Better Experience Download <br />
            Tomato App
          </h1>
          <div>
            <div className="play-store">
              <img src={assets.play_store} alt="" />
            </div>
            <div className="app-store">
              <img src={assets.app_store} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

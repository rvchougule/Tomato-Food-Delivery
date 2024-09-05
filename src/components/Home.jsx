import { assets, food_list, menu_list } from "../assets/assets";

export const Home = () => {
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
        <div className="menu-explorer">
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
                <div className="food-menu" key={index}>
                  <img src={menu_image} alt={menu_name} />
                  <h4>{menu_name}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="top-dishes">
          <h1>Top dishes near you</h1>
          <div className="card-container">
            {food_list.map((foodItem) => {
              return (
                <div className="card" key={foodItem._id}>
                  <div className="dish-image">
                    <img src={foodItem.image} alt="" />
                  </div>
                  {/* <div className="cart-add">
                    <img src={assets.add_icon_white} alt="add_icon_white" />
                  </div> */}
                  <div className="dish-info">
                    <span className="food-name">{foodItem.name}</span>
                    <div className="rating-container">
                      <img src={assets.rating_starts} alt="" />
                    </div>
                    <p>{foodItem.description}</p>
                    <span className="price">${foodItem.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="download-app">
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

/* eslint-disable react/prop-types */
import { useState } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  decreaseCartItemQuantity,
  getCartItemsList,
} from "../store/slices/cartSlice";

export default function Card({ itemId, image, name, description, price }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const dispatch = useDispatch();
  const cartItemsList = useSelector(getCartItemsList);

  const cartItem = cartItemsList.find((item) => {
    return item.itemId === itemId;
  });

  const handleMouseEnter = () => {
    setMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setMouseEnter(false);
  };
  return (
    <div className="card">
      <div className="dish-image">
        <img src={image} alt="" />
      </div>
      <div
        className="cart-add"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {mouseEnter ? (
          <div className="cart-adder">
            <img
              className="remove_icon_red"
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={() => {
                dispatch(decreaseCartItemQuantity({ itemId }));
              }}
            />
            <span className="cart-item-count">{cartItem?.quantity || 0}</span>
            <img
              className="add_icon_green"
              src={assets.add_icon_green}
              alt="add_icon_green"
              onClick={() => {
                dispatch(addCartItem({ itemId }));
              }}
            />
          </div>
        ) : (
          <img
            className="add_icon_white"
            src={assets.add_icon_white}
            alt="add_icon_white"
          />
        )}
      </div>

      <div className="dish-info">
        <span className="food-name">{name}</span>
        <div className="rating-container">
          <img src={assets.rating_starts} alt="" />
        </div>
        <p>{description}</p>
        <span className="price">${price}</span>
      </div>
    </div>
  );
}

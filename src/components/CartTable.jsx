/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import "./CartTables.css";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "../store/slices/cartSlice";
import { assets } from "../assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartTable({ cartItemsList }) {
  const dispatch = useDispatch();
  const [mouseEnter, setMouseEnter] = useState(false);
  const handleMouseEnter = () => {
    setMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setMouseEnter(false);
  };
  return (
    <div className="cart_table_block">
      <table className="cart_table">
        <thead>
          <tr>
            <th>Items</th>
            <th className="title">Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItemsList.map(({ _id, name, image, price, quantity }) => {
            return (
              <tr key={_id}>
                <td>
                  <img className="itemImage" src={image} alt="" />
                </td>
                <td className="title">{name}</td>
                <td>${price}</td>
                <td>
                  <div
                    className="cart_quantity"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {mouseEnter ? (
                      <div className="cart_quantity_adder">
                        <img
                          className="remove_icon_red"
                          src={assets.remove_icon_red}
                          alt="remove_icon_red"
                          onClick={() => {
                            dispatch(decreaseCartItemQuantity({ itemId: _id }));
                          }}
                        />
                        <span>{quantity}</span>
                        <img
                          className="add_icon_green"
                          src={assets.add_icon_green}
                          alt="add_icon_green"
                          onClick={() => {
                            dispatch(increaseCartItemQuantity({ itemId: _id }));
                          }}
                        />
                      </div>
                    ) : (
                      <span className="quantity_count">{quantity}</span>
                    )}
                  </div>
                </td>
                <td>${quantity * price}</td>
                <td>
                  <span
                    onClick={() => {
                      dispatch(removeCartItem({ itemId: _id }));
                    }}
                  >
                    &#10006;
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!cartItemsList.length ? (
        <div className="craving_quot">
          <Link to="/#menu-explorer">
            &quot;Craving something specific? Search our menu.&quot;
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

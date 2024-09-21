import { useSelector } from "react-redux";
import "./CartPage.css";
import { useEffect, useState } from "react";
import CartTable from "../components/CartTable";
import { getCartFirebaseItemsList } from "../store/slices/cartSliceFirebase";
import { getAllItems } from "../store/slices/itemsSlice";
import PlaceOrder from "../components/PlaceOrder";
export const CartPage = function () {
  const items = useSelector(getAllItems);
  const cartItems = useSelector(getCartFirebaseItemsList);

  const [cartItemsList, setCartItemsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const deliveryFees = 5;

  useEffect(() => {
    setCartItemsList(() =>
      cartItems
        .map(({ itemId, quantity }) => {
          const cartItem = items.find((item) => item._id === itemId);
          return { ...cartItem, quantity };
        })
        .filter(Boolean)
    );
  }, [cartItems, items]);

  const subTotal = cartItemsList.reduce((total, item) => {
    const subTotalItems = item.quantity * item.price;
    return (total += subTotalItems);
  }, 0);

  return (
    <>
      <div className="cart_container">
        <CartTable cartItemsList={cartItemsList} />

        <div className="checkout_container">
          <div className="cart_totals">
            <h1>Cart Totals</h1>
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>${subTotal}</td>
                </tr>
                <tr>
                  <td>Delivery Fee</td>
                  <td>${deliveryFees}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>${subTotal + deliveryFees}</td>
                </tr>
              </tbody>
            </table>
            <button className="checkout_btn" onClick={() => setIsOpen(true)}>
              Place the Order
            </button>
          </div>
          <div className="promocode_container">
            <span>If you have a promo code. Enter it here</span>
            <div className="promo_field">
              <input type="text" name="promo_code" id="promo_code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <PlaceOrder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cartItemsList={cartItemsList}
        subTotal={subTotal}
        deliveryFees={deliveryFees}
      />
    </>
  );
};

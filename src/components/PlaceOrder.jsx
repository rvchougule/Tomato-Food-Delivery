import { useState } from "react";
import { createPortal } from "react-dom";
import "./PlaceOrder.css";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PlaceOrder({
  isOpen,
  setIsOpen,
  cartItemsList,
  subTotal,
  deliveryFees,
}) {
  const { userDetails } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: userDetails?.user_name || "",
    email: userDetails?.email || "",
    address: "",
    mobile: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOrderEmail();
    setFormData({
      name: "",
      email: "",
      address: "",
      mobile: "",
      note: "",
    });
  };

  // EmailJS send function
  const sendOrderEmail = () => {
    const templateParams = {
      user_email: `${userDetails.email}`, // You can dynamically pass the user's email here
      message: cartItemsList
        .map((item) => `${item.name} - Quantity: ${item.quantity}`)
        .join(", "), // Join cart items into a string
      userDetails: `Name:- ${formData.name} 
       MobileNumber:- ${formData.mobile} 
        Address:- ${formData.address}`,
      note: formData.note,
      total: subTotal + deliveryFees,
    };

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID, // Replace with your EmailJS service ID
        import.meta.env.VITE_TEPLATE_ID, // Replace with your EmailJS template ID
        templateParams,
        {
          publicKey: import.meta.env.VITE_USER_ID,
        } // Replace with your EmailJS user ID
      )
      .then(() => {
        toast.success("Order Placed successfully!");
        // console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        toast.error("Order failed try again", err);
        // console.log("Order failed", err);
      });
  };
  return createPortal(
    <div
      className={`modal_container ${isOpen ? "modal_open" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <form
        className="place_order"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Place Your Order</h2>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={userDetails?.user_name || ""}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={userDetails?.email || ""}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          required
        />
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
        />
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Enter note for chef"
          required
        />
        <button type="submit" onClick={() => setIsOpen(false)}>
          Submit Order
        </button>
      </form>
    </div>,
    document.getElementById("modal_portal")
  );
}

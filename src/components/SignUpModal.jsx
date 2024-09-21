import { createPortal } from "react-dom";
import "./SignUpModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserToFirebase,
  registerUserToFirebase,
  signInModelClose,
} from "../store/slices/userSlice";

export default function SignUpModal() {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(true);
  const [signInUser, setSignInUser] = useState({ email: "", password: "" });
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const { isOpen } = useSelector((state) => state.user);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        loginUserToFirebase({
          email: signInUser.email,
          password: signInUser.password,
        })
      );

      setSignInUser({ email: "", password: "" });
    } catch (error) {
      console.log("Login error-", error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        registerUserToFirebase({
          email: user.email,
          password: user.password,
          user_name: user.user_name,
        })
      );

      setUser({
        user_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("registerError-", error.message);
    }
  };
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  return createPortal(
    <div
      className={`modal_container ${isOpen ? "modal_open" : ""}`}
      onClick={() => dispatch(signInModelClose())}
    >
      {!signIn ? (
        //   Sign Up form
        <form
          onSubmit={handleRegister}
          className="sign_up"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="head-title">
            <span>Sign Up</span>
            <span onClick={() => dispatch(signInModelClose())}>&#10006;</span>
          </div>
          <input
            type="text"
            name="user_name"
            id="full_name"
            placeholder="Your Name"
            value={user.user_name}
            onChange={handleRegisterChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email"
            value={user.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter the Password"
            value={user.password}
            onChange={handleRegisterChange}
          />
          <button type="submit" onClick={() => dispatch(signInModelClose())}>
            Submit
          </button>
          <div className="terms_block">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="checkbox"
            />
            <span>
              By continuing, I agree to the terms of use & privacy policy
            </span>
          </div>
          <span className="login_link">
            Already have an account?{" "}
            <span onClick={() => setSignIn(true)}> Login here</span>
          </span>
        </form>
      ) : (
        //   Login form
        <form
          onSubmit={handleLoginSubmit}
          className="sign_in"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="head-title">
            <span>Login </span>
            <span onClick={() => dispatch(signInModelClose())}>&#10006;</span>
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            value={signInUser.email}
            onChange={handleSignInChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter the Password"
            value={signInUser.password}
            onChange={handleSignInChange}
          />
          <button type="submit" onClick={() => dispatch(signInModelClose())}>
            Submit
          </button>
          <div className="terms_block">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="checkbox"
            />
            <span>
              By continuing, I agree to the terms of use & privacy policy
            </span>
          </div>
          <span className="login_link">
            Create a new account?{" "}
            <span onClick={() => setSignIn(false)}> Click here</span>
          </span>
        </form>
      )}
    </div>,
    document.getElementById("modal_portal")
  );
}

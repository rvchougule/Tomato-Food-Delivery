import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-disription">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
            quasi vitae ducimus a. Rerum sit quos, nesciunt id eos pariatur,
            vitae deserunt unde sunt ea quia, velit quibusdam eligendi ullam?
          </p>
          <div className="social-media-link">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="company-link">
          <h3>COMPANY</h3>
          <Link className="footer-link">Home</Link>
          <Link className="footer-link">About Us</Link>
          <Link className="footer-link">Delivery</Link>
          <Link className="footer-link">Privacy policy</Link>
        </div>
        <div className="get-in-touch">
          <h3>GET IN TOUCH</h3>
          <span className="contactNumber">+1-212-4500-7890</span>
          <span className="company-email">contact@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}

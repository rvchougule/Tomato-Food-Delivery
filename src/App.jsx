import { Header } from "./components/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} // Ensure correct syntax
      />
      <Footer />
    </>
  );
};

export default App;

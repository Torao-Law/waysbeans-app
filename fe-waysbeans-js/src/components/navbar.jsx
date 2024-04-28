import React, { useState, useContext } from "react";
import UserDropdown from "../elements/dropdownUser";
import ModalRegister from "../elements/modalRegister";
import ModalLogin from "../elements/modalLogin";
import Logo from "../assets/Icon.png";
import { UserContext } from "../stores/userContext";
import { Link } from "react-router-dom";
import Chart from "../elements/chartElement";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, _] = useContext(UserContext);

  const loginModal = () => setShowLogin(false);
  const registerModal = () => setShowRegister(false);

  function switchRegister() {
    loginModal();
    setShowRegister(true);
  }

  function switchLogin() {
    registerModal();
    setShowLogin(true);
  }

  return (
    <div
      className="bg-white py-2 fixed top-0 left-0 right-0 z-10"
      style={{ overflowX: "hidden" }}
    >
      <div className="px-28 h-18 grid content-centert grid-cols-2 w-screen">
        <div className="flex items-center">
          {state?.user?.status === "admin" ? (
            <>
              <Link to="/product-admin">
                <img className="h-8" src={Logo} alt="logo" />
              </Link>
              <Link to="/product-admin" className="ms-10">
                <p>Home</p>
              </Link>
              <Link to="/list-product" className="ms-10">
                <p>List Product</p>
              </Link>
              <Link to="/list-category" className="ms-10">
                <p>List Category</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/product-admin">
                <img className="h-8" src={Logo} alt="logo" />
              </Link>
              <Link to="/" className="ms-10">
                <p>Home</p>
              </Link>
              <Link to="/products" className="ms-10">
                <p>Products</p>
              </Link>
              <Link to="/contact" className="ms-10">
                <p>Contact Me</p>
              </Link>
            </>
          )}
        </div>

        <div className="grid justify-items-end">
          {state.isLogin ? (
            <div className="flex items-center">
              <Link to="/transactions">
                <Chart />
              </Link>
              <div className="ml-10 cursor-pointer">
                <UserDropdown />
              </div>
            </div>
          ) : (
            <div>
              <button
                className="mr-3  px-6 py-1 rounded-lg text-isPrimary border border-isPrimary text-xs"
                onClick={() => setShowLogin(true)}
              >
                LOGIN
              </button>
              <button
                className=" text-white px-6 py-1 rounded-lg text-xs  border bg-isPrimary"
                onClick={() => setShowRegister(true)}
              >
                REGISTER
              </button>
            </div>
          )}
        </div>
      </div>
      <ModalRegister
        showModal={showRegister}
        closeModal={registerModal}
        loginModal={switchLogin}
      />
      <ModalLogin
        showModal={showLogin}
        closeModal={loginModal}
        loginModal={switchRegister}
      />
    </div>
  );
};

export default Navbar;

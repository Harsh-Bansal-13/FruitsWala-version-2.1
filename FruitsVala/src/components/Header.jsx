import React, { useState, useContext } from "react";
import Logo from "../images/Logo.png";
import avatar from "../images/avatar.webp";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const changeMenu = () => {
    setisMenu(!isMenu);
  };

  const navigate = useNavigate();
  const logout1 = () => {
    axios
      .get("https://fruitswala-version-2-1.onrender.com/logout")
      .then((res) => {
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        if (res.data === "Success") navigate(0);
      })
      .catch((err) => console.log(err));
  };
  const [isMenu, setisMenu] = useState(false);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: true,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-4 md:px-10 bg-purple-200">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.4 }}
            src={Logo}
            className="w-24 h-22 object-cover"
            alt="Logo img"
            onClick={() => setisMenu(false)}
          />
          <p
            className="text-headingColor text-xl font-bold"
            onClick={() => setisMenu(false)}
          >
            City
          </p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex items-center gap-4"
          >
            <li className="text-base text-textColor hover:text-gray-900 hover:transition-all ease-in-out cursor-pointer hover:border-b-2 border-gray-950">
              Home
            </li>
            <li className="text-base text-textColor hover:text-gray-900 transition-all ease-in-out cursor-pointer hover:border-b-2 border-gray-950">
              Varieties
            </li>
            <li className="text-base text-textColor hover:text-gray-900 transition-all ease-in-out cursor-pointer hover:border-b-2 border-gray-950">
              About us
            </li>
            <li className="text-base text-textColor hover:text-gray-900 transition-all ease-in-out cursor-pointer hover:border-b-2 border-gray-950">
              Services
            </li>
          </motion.ul>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:text-gray-900"></MdShoppingBasket>
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>
          <div className="relative">
            {user && user.username ? (
              <div onClick={changeMenu}>
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={avatar}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl object-cover cursor-pointer "
                  alt="User Profile"
                />
                {isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="w-36 shadow-xl flex flex-col absolute rounded-lg  right-0 bg-primary "
                  >
                    {user && user.username && user.isSeller === true && (
                      <Link to={"/createItem"}>
                        <p
                          className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-50 hover:bg-purple-100  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                          onClick={() => setisMenu(false)}
                        >
                          new item <MdAdd></MdAdd>
                        </p>
                      </Link>
                    )}
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-red-400 transition-all duration-100 ease-in-out text-base justify-center  bg-red-600 text-white"
                      onClick={logout1}
                    >
                      logout<MdLogout></MdLogout>
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div onClick={changeMenu}>
                <div className="m-0 text-purple-600 font-bold hover:underline">
                  {" "}
                  Register/Login
                </div>
                {isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="w-36 shadow-xl flex flex-col absolute rounded-lg  right-0 bg-primary "
                  >
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-100 hover:bg-purple-600 hover:text-white  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                      onClick={() => setisMenu(false)}
                    >
                      <Link to="/register">Register</Link>
                    </p>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-100 hover:bg-purple-600 hover:text-white  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                      onClick={() => setisMenu(false)}
                    >
                      <Link to="/login">Login</Link>
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/*mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:text-gray-900"></MdShoppingBasket>
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-1 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>
        <Link to={"/"} className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.4 }}
            src={Logo}
            className="w-24 h-22 object-cover"
            alt="Logo img"
            onClick={() => setisMenu(false)}
          />
          <p
            className="text-headingColor text-xl font-bold"
            onClick={() => setisMenu(false)}
          >
            City
          </p>
        </Link>
        <div className="relative">
          {user && user.username ? (
            <div onClick={changeMenu}>
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl object-cover cursor-pointer "
                alt="User Profile"
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-36 shadow-xl flex flex-col absolute rounded-lg  right-0 bg-primary "
                >
                  {user && user.username && user.isSeller === true && (
                    <Link to={"/createItem"}>
                      <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-50 hover:bg-purple-100  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                        onClick={() => setisMenu(false)}
                      >
                        new item <MdAdd></MdAdd>
                      </p>
                    </Link>
                  )}
                  <ul className="flex flex-col">
                    <li
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-purple-50 hover:bg-purple-100  transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setisMenu(false)}
                    >
                      Home
                    </li>
                    <li
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-purple-50 hover:bg-purple-100  transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setisMenu(false)}
                    >
                      Varieties
                    </li>
                    <li
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-purple-50 hover:bg-purple-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setisMenu(false)}
                    >
                      About us
                    </li>
                    <li
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-purple-50 hover:bg-purple-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setisMenu(false)}
                    >
                      Services
                    </li>
                  </ul>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-red-400 transition-all duration-100 ease-in-out text-base justify-center  bg-red-600 text-white"
                    onClick={logout1}
                  >
                    logout<MdLogout></MdLogout>
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <div onClick={changeMenu}>
              <div className="m-0 text-purple-600 font-bold hover:underline">
                {" "}
                Register/Login
              </div>
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-36 shadow-xl flex flex-col absolute rounded-lg  right-0 bg-primary "
                >
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-100 hover:bg-purple-600 hover:text-white  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                    onClick={() => setisMenu(false)}
                  >
                    <Link to="/register">Register</Link>
                  </p>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer  bg-purple-100 hover:bg-purple-600 hover:text-white  transition-all duration-100 ease-in- text-textColor text-base rounded-lg"
                    onClick={() => setisMenu(false)}
                  >
                    <Link to="/login">Login</Link>
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

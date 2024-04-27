import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
// import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../images/emptyCart.svg";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const update = true;
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };
  useEffect(() => {
    let harshTotal = 0;
    cartItems.map((item) => {
      harshTotal += item.price * item.quantity;
    });
    setTot(harshTotal);
  }, [tot, flag, cartItems, user]);
  const clearCart = () => {
    cartItems.map((item) => {
      item.quantity = 1;
    });
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    axios.delete`https://fruitswala-version-2-1-dqba.onrender.com/empty-cart/${user?.id}`()
      // .delete(`http://localhost:3001/empty-cart/${user?.id}`)
      .then((response) => {
        // console.log("Cart items deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting cart items:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-purple-300 drop-shadow-md flex flex-col z-[101] backdrop-blur-lg"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl"></MdOutlineKeyboardBackspace>
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-red-500 rounded-md hover:shadow-md cursor-pointer text-fuchsia-100 text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill></RiRefreshFill>
        </motion.p>
      </div>
      {/* {bottom section} */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-fuchsia-200 rounded-t-[2rem] flex flex-col">
          {/* Cart Item Section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart Item */}

            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                  update={update}
                ></CartItem>
              ))}
          </div>

          {/* total Cart section */}
          <div className="w-full flex-1 bg-purple-200 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-lg">Sub Total</p>
              <p className="text-textColor text-lg">₹ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-lg">Delivery</p>
              <p className="text-textColor text-lg">₹ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-xl font-semibold">Total</p>
              <p className="text-textColor text-xl font-semibold">
                ₹ {tot + 2.5}
              </p>
            </div>
            {user.username ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full 
            bg-gradient-to-tr from-orange-400  to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                <Link to={{ pathname: "/paymentSummary", state: { tot } }}>
                  Check Out
                </Link>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full 
            bg-gradient-to-tr from-orange-400  to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                <Link to="/login">Login in to Check Out</Link>
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to the cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;

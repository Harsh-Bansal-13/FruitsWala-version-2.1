import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import Loader from "./Loader";
import EmptyCart from "../images/emptyCart.svg";
import { loadStripe } from "@stripe/stripe-js";
function PaymentSummary(props) {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const update = false;
  useEffect(() => {
    let harshTotal = 0;
    if (cartItems)
      cartItems.map((item) => {
        harshTotal += item.price * item.quantity;
      });
    setTot(harshTotal);
  }, [cartItems]);
  // const makePayment = async () => {
  //   const stripe = await loadStripe(
  //     "pk_test_51P6ZwaSFp55C62QDgCZmchKr1ew30RigKUpqJhUH5gKUUcdifZ2TlnS59156d8SiC7l4olZnvYS4LL5qzbEBOAkS00RXwu3Jyi"
  //   );
  //   const body = {
  //     products: cartItems,
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   const response = await fetch(
  //     "http://localhost:3001/create-checkout-session",
  //     {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(body),
  //     }
  //   );
  //   const session = await response.json();
  //   const result = stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });
  // };
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P6ZwaSFp55C62QDgCZmchKr1ew30RigKUpqJhUH5gKUUcdifZ2TlnS59156d8SiC7l4olZnvYS4LL5qzbEBOAkS00RXwu3Jyi"
    );

    const response = await axios.post(
      "https://fruitswala-version-2-1-dqba.onrender.com/create-checkout-session",
      // "http://localhost:3001/create-checkout-session",
      {
        products: cartItems,
      }
    );
    console.log(response);
    const sessionID = response.data.sessionId;
    // console.log(sessionID, "HARSH");
    const result = await stripe.redirectToCheckout({
      sessionId: sessionID,
    });

    if (result.error) {
      console.error("Error redirecting to checkout:", result.error);
    }
  };

  console.log(cartItems);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="md:w-[30%] h-720 border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2 m-0 bg-purple-300">
        <div className="text-center w-full margin-0 bg-purple-500 h-[50px] rounded-md p-2">
          <h1 className="text-2xl text-white text-bolder">Summary</h1>
        </div>
        <br />
        {cartItems && cartItems.length > 0 ? (
          <div className="w-full h-full bg-fuchsia-200 rounded-t-[2rem] flex flex-col">
            {/* Cart Item Section */}
            <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              {/* Cart Item */}

              {cartItems &&
                cartItems.map((item) => (
                  <CartItem
                    key={item?._id}
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
                  onClick={makePayment}
                >
                  Pay Now
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
            <div className="flex flex-col justify-center text-center">
              <p className="text-xl text-textColor font-semibold">
                Your Haven't add any Items.
              </p>{" "}
              <p className="text-xl text-textColor font-semibold">
                Go To Home and Add any Items
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full 
            bg-gradient-to-tr from-orange-400  to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            >
              <Link to="/">Go to Home</Link>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
export default PaymentSummary;

import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../images/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtoCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  useEffect(() => {
    addtoCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 bg-purple-100 flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center scrollbar-none"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-48 bg-cardOverlay rounded-lg my-12 p-2 backdrop-blur-md hover:drop-shadow-2xl justify-between items-center flex flex-col"
          >
            <div className="w-full flex items-center justify-between ">
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="w-[150px] h-[150px] -mt-10 drop-shadow-lg"
              >
                <img
                  src={item?.imageAsset}
                  alt={item?.title}
                  className="w-full h-full object-contain"
                ></img>
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:shadow-md "
                onClick={() => {
                  var flag = false;
                  cartItems.map((item1) => {
                    if (item1.id === item?.id) {
                      flag = true;
                      item1.quantity += 1;
                    }
                  });
                  if (flag) {
                    setItems([...cartItems]); // Updating the state with the modified cartItems
                  } else {
                    setItems([...cartItems, item]); // Adding the new item to the cartItems array
                  }
                }}
              >
                <MdShoppingBasket className="text-white"></MdShoppingBasket>
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="text-sm text-gray-500">
                {" "}
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-sm text-headingColor font-semibold">
                  <span className="text-s text-red-500">₹</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="" />
          <p className="text-textColor text-xl font-semibold">
            Items Not Available :(
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

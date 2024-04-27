import React, { useState, useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import axios from "axios";
let items = [];
const CartItem = ({ item, setFlag, flag, update }) => {
  const tempItem = item;
  const [{ cartItems, user }, dispatch] = useStateValue();
  const cartDispatch = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };
  const addCartUrl = `https://fruitswala-version-2-1-dqba.onrender.com/add-cart-item/${user?.id}`;
  // const addCartUrl = `http://localhost:3001/add-cart-item/${user?.id}`;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const updateQty = (action, id) => {
    if (action == "add") {
      cartItems.map((item) => {
        if (item.id === id) {
          // console.log(item);
          const fruitItemId = { itemId: item._id };
          // console.log(addCartUrl);
          axios
            .post(addCartUrl, fruitItemId, config)
            .then((res) => {
              // console.log(res.message);
            })
            .catch((err) => {
              // console.log(err);
            });
          item.quantity += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      const deleteCartUrl = `https://fruitswala-version-2-1-dqba.onrender.com/delete-cart-item/${user?.id}/items/${item._id}`;
      // const deleteCartUrl = `http://localhost:3001/delete-cart-item/${user?.id}/items/${item._id}`;
      // console.log(deleteCartUrl);
      axios
        .post(deleteCartUrl)
        .then((res) => {
          // console.log(res.message);
        })
        .catch((err) => {
          // console.log(err);
        });
      if (item.quantity === 1) {
        item.quantity = 1;
        items = cartItems?.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        cartItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    items = cartItems;
  }, [cartItems]);
  useEffect(() => {
    items = cartItems;
  }, [item.quantity, cartItems]);
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-fuchsia-300 flex items-center gap-2">
      <img
        src={item?.imageAsset}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />
      {/* {name and price section} */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-textColor"> {item?.title}</p>
        <p className="text-sm block text-textColor font-semibold">
          {" "}
          ₹ {item?.price * item.quantity}
        </p>
      </div>

      {/* {button setion} */}
      <div className="group flex flex-col items-center gap-2 ml-auto cursor-pointer">
        <div className="text-textColor font-bold">Qty</div>
        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
          {update && (
            <motion.div whileTap={{ scale: 0.75 }}>
              <BiMinus
                className="text-textColor"
                onClick={() => updateQty("remove", item?.id)}
              ></BiMinus>
            </motion.div>
          )}
          <p className="w-5 h-5 rounded-sm  text-textColor flex items-center justify-center ">
            {item.quantity}
          </p>
          {update && (
            <motion.div whileTap={{ scale: 0.75 }}>
              <BiPlus
                className="text-textColor"
                onClick={() => updateQty("add", item?.id)}
              ></BiPlus>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;

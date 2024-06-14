import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../images/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import axios from "axios";

const RowContainer = ({ flag, data }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  // const [deletedItemId, setdeletedItemId] = useState("");
  axios.defaults.withCredentials = true;
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();
  // const url = `https://fruitswala.onrender.com/add-cart-item/${user?.id}`;
  // const url = `https://fruitswala-version-2-1-dqba.onrender.com/add-cart-item/${user?.id}`;
  const url = `/add-cart-item/${user?.id}`;
  const fetchData = async () => {
    axios
      .get("/getItems")
      // .get("https://fruitswala.onrender.com/getItems")
      // .get("https://fruitswala-version-2-1-dqba.onrender.com/getItems")
      .then((items) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: items.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleDeleteItem = async (deletedItemId) => {
    // console.log(deletedItemId);
    const tempdata = {
      // id: `${Date.now()}`,
      deletedItemId: deletedItemId,
    };
    await axios
      .post(
        "/deleteItem",

        tempdata,

        config
      )
      .then((res) => {
        fetchData();
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
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
        data.map((item) => {
          // console.log(item);
          return (
            <div
              key={item._id}
              className="w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-48 bg-cardOverlay rounded-lg my-12 p-2 backdrop-blur-md hover:drop-shadow-2xl justify-between items-center flex flex-col"
            >
              <div className="w-full flex items-center justify-between ">
                <motion.div className="w-[150px] h-[150px] -mt-10 drop-shadow-lg flex-col gap-10">
                  <motion.img
                    whileHover={{ scale: 1.3 }}
                    src={item?.imageAsset}
                    alt={item?.title}
                    className="w-full h-full object-contain"
                  ></motion.img>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:shadow-md "
                  onClick={() => {
                    var flag = false;
                    cartItems.map((item1) => {
                      if (item1._id === item?._id) {
                        flag = true;
                        item1.quantity += 1;
                      }
                    });
                    const fruitItemId = { itemId: item?._id };
                    // console.log(url);
                    axios
                      .post(url, fruitItemId, config)
                      .then((res) => {
                        // console.log(res.message);
                      })
                      .catch((err) => {
                        console.log(err);
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
              <div className="flex justify-between w-full">
                {user && user?.id == item?.userId ? (
                  <div className="flex flex-col justify-center items-center">
                    <motion.div whileTap={{ scale: 0.8 }} title="Delete Item">
                      {/* <form onSubmit={handleDeleteItem}> */}
                      <button
                        type="button"
                        className="p-1 rounded-lg bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        {" "}
                        <MdDelete className="text-white"></MdDelete>
                      </button>
                      {/* </form> */}
                    </motion.div>
                  </div>
                ) : (
                  <></>
                )}
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
            </div>
          );
        })
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

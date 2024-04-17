import React from "react";

const fruitsCard = ({ item }) => {
  return (
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
        <p className="text-sm text-gray-500"> {item?.calories} Calories</p>
        <div className="flex items-center gap-8">
          <p className="text-sm text-headingColor font-semibold">
            <span className="text-s text-red-500">₹</span>
            {item?.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default fruitsCard;

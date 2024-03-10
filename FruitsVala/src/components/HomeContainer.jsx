import React from "react";
import Delivery from "../images/fruits-delivery-image-removebg.png";
import Fruitsbg from "../images/background-image.jpg";
import { heroData } from "../utils/data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen"
      id="Home"
    >
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-2 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Fastest Fruits Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain "
              alt="Delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-normal text-headingColor">
          Freshness Delivered Daily: Nature's Bounty at Your{" "}
          <span className="text-orange-600 text-[3rem] md:text-[4rem] ">
            Fingertips!
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Fruits are nature's delicious and vibrant gifts, offering a
          tantalizing array of flavors, textures, and colors. Bursting with
          essential nutrients, vitamins, and antioxidants, fruits are not only a
          delightful treat for the senses but also a vital component of a
          healthy diet.
        </p>
        <motion.button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-gray-100"
          whileTap={{ scale: 0.8 }}
        >
          {" "}
          <Link to="/paymentSummary">Order Now</Link>
        </motion.button>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <img
          className=" pt-0 mt-0 h-510 w-full lg:w-auto lg:h-650 md:ml-auto rounded-lg blur-sm hover:blur-none"
          src={Fruitsbg}
          alt="bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className="w-[130px] md:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-lg flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={item.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  alt={item.name}
                />
                <p className="mt-2 lg:mt-4 text-sm lg:text-lg font-semibold text-textColor">
                  {item.name}
                </p>
                <p className="text-xs font-semibold text-headingColor">
                  <span className="text-sm text-red-600">₹ </span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

import React, { useRef, useState, useEffect } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import Loader from "./Loader";
import axios from "axios";
const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  // const [scrollValue, setScrollValue] = useState(0);
  // const [scroll, setScroll] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [cartShow, foodItems]);
  useEffect(() => {
    axios
      // .get("http://localhost:3001/status")
      // .get("https://fruitswala-version-2-1-dqba.onrender.com/status")
      .get("https://fruitswala.onrender.com/status")
      .then(({ data }) => {
        if (data && data.status === "ok") {
          setLoading(false); // Hide loader and show your application
        }
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  }, []);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full mt-96 md:my-5">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100">
            {" "}
            Our Fresh & Healthy Fruits
          </p>
          {/* <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 flex cursor-pointer  hover:shadow-lg items-center justify-center "
              // onClick={() => {
              //   setScroll("left");
              //   setScrollValue(scrollValue - 320);
              //   if (scrollValue < 0) {
              //     setScrollValue(0);
              //   }
              // }}
              onClick={() => setScrollValue(-2000)}
            >
              <MdChevronLeft className="text-lg text-white"></MdChevronLeft>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg flex bg-orange-400 hover:bg-orange-500 items-center justify-center cursor-pointer hover:shadow-lg"
              // onClick={() => {
              //   setScroll("right");
              //   setScrollValue(scrollValue + 320);
              //   if (scrollValue > 100) {
              //     setScrollValue(100);
              //   }
              // }}
              onClick={() => setScrollValue(2000)}
            >
              <MdChevronRight className="text-lg text-white"></MdChevronRight>
            </motion.div>
          </div> */}
        </div>
        {loading ? (
          <div className="w-full justify-center flex items-end h-screen">
            <div className="my-auto">
              <Loader></Loader>
            </div>
          </div>
        ) : (
          <RowContainer
            flag={true}
            data={foodItems?.filter((n) => n.category === "fruits") || []}
          ></RowContainer>
        )}
      </section>
      {loading ? (
        <div className="w-full justify-center flex items-end h-screen">
          <div className="my-auto">
            <Loader></Loader>
          </div>
        </div>
      ) : (
        <MenuContainer />
      )}
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;

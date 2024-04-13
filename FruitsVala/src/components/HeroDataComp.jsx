import React from "react";
import { motion, useAnimation } from "framer-motion";

const HeroDataComp = ({ item }) => {
  const controls = useAnimation();
  return (
    <div>
      {" "}
      <motion.div
        key={item.id}
        className="w-[130px] md:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-lg flex flex-col items-center justify-center drop-shadow-lg"
        animate={controls}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            y: [0, -14, 0], // Y-axis movement
            scale: [1.001, 1.001, 1.001], // Scale effect
            transition: {
              duration: 4, // Duration of the animation
              repeat: Infinity, // Repeat the animation infinitely
              ease: "easeInOut", // Easing function
            },
          })
        }
      >
        <motion.img
          src={item.imageSrc}
          className="w-20 lg:w-40 -mt-10 lg:-mt-20"
          alt={item.name}
          whileHover={{ scale: 1.2 }}
        />
        <p className="mt-2 lg:mt-4 text-sm lg:text-lg font-semibold text-textColor">
          {item.name}
        </p>
        <p className="text-xs font-semibold text-headingColor">
          <span className="text-sm text-red-600">₹ </span>
          {item.price}
        </p>
      </motion.div>
    </div>
  );
};

export default HeroDataComp;

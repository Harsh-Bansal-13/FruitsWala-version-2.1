import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
const MenuContainer = () => {
  const [filter, setfilter] = useState("fruits");

  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);

  return (
    <section className="w-full mt-12 md:my-5" id="Menu">
      <div className="w-full flex flex-col items-center justify-center">
        {" "}
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-64 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-700 transition-all ease-in-out duration-100 mr-auto">
          {" "}
          Savor the Sweetness of Desert Shakes and Fruits!
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName
                    ? "bg-purple-400"
                    : "bg-fuchsia-50"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center  hover:bg-purple-400`}
                onClick={() => {
                  setfilter(category.urlParamName);
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category.urlParamName
                      ? "bg-fuchsia-50"
                      : "bg-purple-400"
                  } group-hover:bg-fuchsia-50 flex items-center justify-center shadow-2xl`}
                >
                  <i
                    className={`${category.class} ${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-fuchsia-50"
                    }`}
                  ></i>
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-fuchsia-50"
                      : "text-textColor"
                  } group-hover:text-fuchsia-50`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          ></RowContainer>
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;

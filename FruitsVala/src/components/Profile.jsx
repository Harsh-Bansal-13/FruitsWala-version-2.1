import React, { useState } from "react";
import { motion } from "framer-motion";
import avatar from "../images/avatar.webp";
const Profile = () => {
  const [imageAsset, setImageAsset] = useState(avatar);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen">
      <motion.div className="rounded-full flex items-center justify-center">
        <img src={imageAsset} className="h-1/2 w-1/2 rounded-full"></img>
      </motion.div>
      <div></div>
    </div>
  );
};

export default Profile;

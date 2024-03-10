import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import axios from "axios";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Loader from "./Loader";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState("harsh");
  const [msg, setMsg] = useState(null);
  const [imageAsset, setImageAsset] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();
  const postImage = (pics) => {
    setIsLoading(true);
    if (pics == undefined) {
      setFields(true);
      setMsg("Please Select an Image :( ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "fruitswala");
      data.append("cloud_name", "djearclq9");
      fetch("https://api.cloudinary.com/v1_1/djearclq9/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const downloadURL = data.url.toString();
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Uploaded successfull :)");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setFields(true);
      setMsg("File is Not an Image :( ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const clearData = () => {
    setTitle("");
    setImageAsset("");
    setCalories("");
    setPrice("");
    setCategory(null);
  };
  const fetchData = async () => {
    axios
      // .get("http://localhost:3001/getItems")
      .get("https://fruitswala-version-2-1-dqba.onrender.com/getItems")
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
  const saveDetails = async () => {
    setIsLoading(true);

    if (!title || !calories || !imageAsset || !price || !category) {
      setFields(true);
      setMsg("Required Fields can't be empty");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const tempdata = {
      id: `${Date.now()}`,
      title: title,
      imageAsset: imageAsset,
      category: category,
      calories: calories,
      price: price,
      quantity: 1,
    };
    const { data } = await axios
      .post(
        // "http://localhost:3001/createItem",
        "https://fruitswala-version-2-1-dqba.onrender.com/createItem",

        tempdata,

        config
      )
      .then((res) => {
        if (res.data === "success") {
          setIsLoading(false);
          setFields(true);
          setMsg("Data uploaded Succesfully");
          clearData();
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
            window.location.href = "/createItem";
          }, 4000);
        }
      })
      .catch((error) => {
        setFields(true);
        setMsg("Error while uploading : try again :( ");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      });
    fetchData();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center md:mt-8">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b-2 border-purple-700 flex items-center gap-2 rounded-md">
          <MdFastfood className="text-2xl text-purple-600"></MdFastfood>
          <input
            type="text"
            required
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-purple-700 bg-purple-100 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-purple-100 text-headingColor">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-purple-100 text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center flex-col border-2 border-dotted border-purple-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              {" "}
              {imageAsset === "" ? (
                <>
                  {" "}
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-purple-500 text-3xl hover:text-purple-700"></MdCloudUpload>
                      <p className="text-purple-500 hover:text-purple-700">
                        {" "}
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept=""
                      onChange={(e) => postImage(e.target.files[0])}
                      className="w-0 h-0"
                    ></input>
                  </label>{" "}
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-300 h-225 md:h-420 md:w-460 object-cover"
                    ></img>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b-2 border-purple-700 flex items-center gap-2 rounded-lg">
            <MdFoodBank className="text-purple-600 text-2xl"></MdFoodBank>
            <input
              type="text"
              required
              value={calories}
              placeholder="Enter Calories"
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b-2 border-purple-700 flex items-center gap-2 rounded-lg">
            <MdAttachMoney className="text-purple-600 text-2xl"></MdAttachMoney>
            <input
              type="text"
              required
              value={price}
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex item-center w-full">
          {" "}
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-purple-500 px-12 py-2 text-white rounded-md hover:shadow-md duration-500 transition-all ease-in-out hover:bg-purple-700 font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;

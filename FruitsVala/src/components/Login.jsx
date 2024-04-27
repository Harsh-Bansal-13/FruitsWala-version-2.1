import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { motion } from "framer-motion";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [fields, setFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alertStatus, setAlertStatus] = useState("harsh");
  useEffect(() => {}, [error]);
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      // .post("http://localhost:3001/login", {
      .post("https://fruitswala-version-2-1-dqba.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "Success") {
          setFields(true);
          setMsg(res.data);
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
          window.location.href = "/";
        } else if (res.data === "An Email Send Successfully") {
          setFields(true);
          setMsg(res.data + "Please Verify");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        } else {
          setFields(true);
          setMsg(res.data);
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mt-20">
      {fields && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-fit p-2 rounded-lg text-center text-lg font-semibold mt-5 ${
            alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
          }`}
        >
          {msg}
        </motion.p>
      )}
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center ">
          <Loader></Loader>
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center ">
          <div className="w-[100%] md:w-[70%]  border border-gray-300  flex flex-col items-center gap-2 m-0 p-0 rounded-md justify-between">
            <div className="text-center w-full margin-0  h-[50px] rounded-md p-2">
              <h1 className="text-2xl text-purple-600 font-bold text-bolder">
                Login
              </h1>
            </div>
            <br />
            <form className="mr-4 ml-4" onSubmit={handleSubmit}>
              <div className="w-full py-2  flex items-center gap-2 rounded-md">
                <div className="w-full h-full flex flex-col md:flex-row">
                  <label
                    htmlFor="email"
                    className="text-lg text-purple-600 mr-5"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full h-full text-lg bg-transparent outline-none  placeholder:text-gray-400 text-textColor border-b-2 border-purple-700"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <div className="w-full py-2  flex items-center gap-2 rounded-md ">
                <div className="w-full h-full flex flex-col md:flex-row">
                  <label
                    htmlFor="password"
                    className="text-lg text-purple-600 mr-5"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    className="border-b-2 border-purple-700  text-lg bg-transparent outline-none  placeholder:text-gray-400 text-textColor"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex item-center w-full">
                <button className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-purple-500 px-12 py-2 text-white rounded-md hover:shadow-md duration-500 transition-all ease-in-out hover:bg-purple-700 font-semibold mt-8">
                  Login
                </button>
              </div>
            </form>
            <br></br>
            <p className="text-purple-400">Don't have an account?</p>
            <ul>
              <Link to="/register">
                <button className="m-0 text-purple-900 hover:underline">
                  {" "}
                  Register
                </button>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

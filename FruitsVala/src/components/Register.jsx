import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSeller, setisSeller] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://fruitswala-version-2-1.onrender.com/register", {
        username,
        email,
        password,
        isSeller,
      })
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[70%]  border border-gray-300  flex flex-col items-center gap-2 m-0 p-0 rounded-md justify-between">
        <div className="text-center w-full margin-0 bg-purple-500 h-[50px] rounded-md p-2">
          <h1 className="text-2xl text-white text-bolder">Register</h1>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="w-full py-2  flex items-center gap-2 rounded-md justify-between">
            <label htmlFor="name" className="text-lg text-purple-600 mr-5">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="border-b-2 border-purple-700  text-lg bg-transparent outline-none  placeholder:text-gray-400 text-textColor"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div className="w-full py-2  flex items-center gap-2 rounded-md justify-between">
            <label htmlFor="email" className="text-lg text-purple-600 mr-5">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="border-b-2 border-purple-700  text-lg bg-transparent outline-none  placeholder:text-gray-400 text-textColor"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="w-full py-2  flex items-center gap-2 rounded-md justify-between">
            <label htmlFor="password" className="text-lg text-purple-600 mr-5">
              Password:
            </label>
            <input
              type="password"
              placeholder="********"
              className="border-b-2 border-purple-700  text-lg bg-transparent outline-none  placeholder:text-gray-400 text-textColor"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full py-2 flex items-center gap-2 rounded-md justify-end">
            <input
              type="checkbox"
              className="border-b-2 border-purple-700  text-lg bg-transparent outline-none  placeholder:text-gray-400 bg-purple-300 text-purple-500"
              name="iseller"
              onChange={(e) => setisSeller(!isSeller)}
            />{" "}
            <span className="text-sm text-purple-600">
              Are You A Seller too ?{" "}
            </span>
          </div>
          <div className="flex item-center w-full">
            <button className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-purple-500 px-12 py-2 text-white rounded-md hover:shadow-md duration-500 transition-all ease-in-out hover:bg-purple-700 font-semibold mt-8">
              Sign up
            </button>
          </div>
        </form>
        <br></br>
        <p className="text-purple-400">Already have account?</p>
        <ul>
          <Link to="/login">
            <button className="m-0 text-purple-900 hover:underline">
              {" "}
              Login
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Register;

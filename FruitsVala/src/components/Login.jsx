import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/";
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[70%]  border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2 m-0 ">
        <div className="text-center w-full margin-0 bg-purple-500 h-[50px] rounded-md p-2">
          <h1 className="text-2xl text-white text-bolder">Login</h1>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
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
  );
}

export default Login;

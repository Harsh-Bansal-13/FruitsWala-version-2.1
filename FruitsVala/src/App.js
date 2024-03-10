import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateContainer,
  Header,
  MainContainer,
  PaymentSummary,
} from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import Register from "./components/Register";
import Login from "./components/Login";
import { createContext } from "react";
import axios from "axios";

export const userContext = createContext();

const App = () => {
  const [{}, dispatch] = useStateValue();
  const [{ cartItems }] = useStateValue();
  const fetchData = async () => {
    axios
      .get("https://fruits-wala-version-2-1-backend.vercel.app/getItems")
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
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {}, [cartItems]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((user1) => {
        dispatch({
          type: actionType.SET_USER,
          user: user1.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-purple-100">
        <Header></Header>
        <main className="mt-24 p-6 md:mt-10 md:px-16 w-full ">
          <Routes>
            <Route path="/*" element={<MainContainer />}></Route>
            <Route path="/createItem" element={<CreateContainer />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/paymentSummary" element={<PaymentSummary />}></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateContainer,
  Header,
  Loader,
  MainContainer,
  PaymentSummary,
} from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import Register from "./components/Register";
import SuccessPayment from "./components/SuccessPayment";
import Login from "./components/Login";
import { createContext } from "react";
import axios from "axios";
import FailPayment from "./components/FailPayment";
import Profile from "./components/Profile";
import EmailVerify from "./components/EmailVerify";

export const userContext = createContext();

const App = () => {
  const [{}, dispatch] = useStateValue();
  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    axios
      .get("/getItems")

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
  const fetchCartData = async (_id) => {
    axios
      .get(`/get-cart-item/${_id}`)
      .then((items) => {
        console.log(items);
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items.data.cartItems,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("/api")
      .then((user1) => {
        dispatch({
          type: actionType.SET_USER,
          user: user1.data,
        });
        if (user1) fetchCartData(user1?.data?.id);
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
            <Route
              path="/successPayment"
              element={<SuccessPayment></SuccessPayment>}
            ></Route>
            <Route path="/failPayment" element={<FailPayment />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/paymentSummary" element={<PaymentSummary />}></Route>
            <Route
              path="/register/:id/verify/:token"
              element={<EmailVerify />}
            ></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;

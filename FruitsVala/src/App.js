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

export const userContext = createContext();

const App = () => {
  const [{}, dispatch] = useStateValue();
  const [{ cartItems, user }] = useStateValue();
  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    axios
      // .get("http://localhost:3001/getItems")

      .get("https://fruitswala-version-2-1-dqba.onrender.com/getItems")
      .then((items) => {
        // console.log(items);
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
      .get(
        `https://fruitswala-version-2-1-dqba.onrender.com/get-cart-item/${_id}`
      )
      // .get(`http://localhost:3001/get-cart-item/${_id}`)
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
  // useEffect(() => {}, [cartItems]);

  useEffect(() => {
    axios
      // .get("http://localhost:3001/")
      .get("https://fruitswala-version-2-1-dqba.onrender.com/")
      .then((user1) => {
        dispatch({
          type: actionType.SET_USER,
          user: user1.data,
        });
        if (user1) fetchCartData(user1?.data?.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:3001/status") // Your deployed backend URL
    //   // fetch("https://fruitswala-version-2-1-dqba.onrender.com/status") // Your deployed backend URL
    //   .then((response) => {
    //     console.log(response);
    //     response.json();
    //   })
    //   .then((data) => {
    //     console.log("harsh", data);
    //     if (data && data.status === "ok") {
    //       setLoading(false); // Hide loader and show your application
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error checking backend status:", error);
    //     // Handle error (show error message or retry)
    //   });

    axios
      // .get("http://localhost:3001/status")
      .get("https://fruitswala-version-2-1-dqba.onrender.com/status")
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
    <AnimatePresence>
      {loading ? (
        <div className="w-full justify-center flex items-end h-screen">
          <div className="my-auto">
            <Loader></Loader>
          </div>
        </div>
      ) : (
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
              <Route
                path="/paymentSummary"
                element={<PaymentSummary />}
              ></Route>
            </Routes>
          </main>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;

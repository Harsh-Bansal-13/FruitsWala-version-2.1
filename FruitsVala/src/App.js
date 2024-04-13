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
import Login from "./components/Login";
import { createContext } from "react";
import axios from "axios";

export const userContext = createContext();

const App = () => {
  const [{}, dispatch] = useStateValue();
  const [{ cartItems }] = useStateValue();
  axios.defaults.withCredentials = true;
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
      })
      .catch((err) => console.log(err));
  }, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check backend availability
    const checkBackend = async () => {
      try {
        // Perform a request to a backend endpoint
        const response = await fetch(
          // "https://fruitswala-version-2-1-dqba.onrender.com/status"
          // "http://localhost:3001/status"
          "/api/status"
        );

        // Check if the response is OK
        if (response.ok) {
          // If the request is successful, set loading to false
          setLoading(false);
        } else {
          // Handle the case where the server returns an error
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        // Handle errors (e.g., backend server not available)
        console.error("Error checking backend status:", error);
      }
    };

    // Call the checkBackend function
    checkBackend();
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

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.jpg";
// import styles from "./styles.module.css";
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/register/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param.id]);

  return (
    // <Fragment>
    <div>
      {validUrl ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12">
          <div className="w-full flex items-center justify-center rounded-full m-10">
            <img
              src={success}
              alt="success_img"
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <h1 className="text-purple-800 text-4xl font-bold">
            Email verified successfully
          </h1>
          <Link to="/login">
            <button className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-purple-600 px-12 py-2 text-white rounded-md hover:shadow-md duration-500 transition-all ease-in-out hover:bg-purple-700 font-semibold mt-8">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex  justify-center w-full h-full">
          <h3 className="text-purple-600 mt-16 text-4xl font-bold">
            {" "}
            404 not found :(
          </h3>
        </div>
      )}
    </div>
    // </Fragment>
  );
};

export default EmailVerify;

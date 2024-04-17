import React from "react";

const FailPayment = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-transparent text-textColor">
      <h1 className="text-4xl font-bold mb-4">Payment Failed :(</h1>
      <p className="text-lg mb-8">Retry</p>
    </div>
  );
};

export default FailPayment;

import React from "react";
import Loading from "../../assets/loading1.gif";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <img src={Loading} className="object-contain max-h-full max-w-full" />
    </div>
  );
};

export default LoadingPage;

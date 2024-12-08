import React from "react";
import NoDataImage from "../../assets/noData.jpg";

const NoDataPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-24 text-center overflow-hidden">
      <div>
        <img
          src={NoDataImage}
          alt="Chưa có dữ liệu"
          className="object-contain"
        />
      </div>
      <p className="text-lg text-gray-500">Chưa có dữ liệu</p>
    </div>
  );
};

export default NoDataPage;

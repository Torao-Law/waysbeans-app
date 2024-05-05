import React from "react";
import formatNumber from "../utils/formatNumber";

const CardChartHistory = ({ count, subAmount, decrement, increment }) => {
  return (
    <div className="rounded bg-white flex justify-between p-6 mb-3">
      <div className="flex">
        <div className="w-40">
          <img
            src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            alt="img-chart"
            className="object-cover"
          />
        </div>

        <div className="ms-8">
          <p className="font-bold">Title</p>
          <p>Category</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-start">
        <p className="text-end font-bold">{formatNumber(100000)}</p>

        
      </div>
    </div>
  );
};

export default CardChartHistory;

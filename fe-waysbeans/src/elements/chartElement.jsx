import React from "react";
import useCart from "../hooks/useCart";

const Chart = () => {
  const { findCarts } = useCart();
  return (
    <div className="relative">
      {findCarts && (
        <span className="absolute text-sm text-white bg-red-700 w-4 h-4 rounded-full ms-4"></span>
      )}

      <i className="fa-solid fa-cart-shopping text-isPrimary text-2xl"></i>
    </div>
  );
};

export default Chart;

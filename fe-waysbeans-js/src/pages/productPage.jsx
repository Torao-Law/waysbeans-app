import React, { useState } from "react";
import Navbar from "../components/navbar";
import CardProduct from "../elements/cardProduct";
import { findProductsClient } from "../hooks/useProduct";
import Footer from "../components/footer";

const Product = () => {
  const pageSize = 10; // Jumlah data per halaman
  const [page, setPage] = useState(1); // Halaman awal

  const { data, isLoading, refetch } = findProductsClient(page, pageSize);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className="px-28 pt-28">
        <h1 className="font-bold text-2xl mb-8 underline text-isPrimary">
          List Product
        </h1>
        <div className="grid grid-rows-2 grid-cols-5 justify-items-center">
          {data?.map((item) => {
            return (
              <div key={item.id} className="mb-6">
                <CardProduct
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  category={item.category}
                  qty={item.qty}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={prevPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>

      {/* <div>
        <h1 className="font-bold text-2xl mb-8 underline text-isPrimary">
          List Product
        </h1>
        <div className="grid grid-rows-4 grid-cols-5 justify-items-center">
          {getProducts?.map((data) => {
            return (
              <div key={data.id} className="mb-6">
                <CardProduct
                  key={data.id}
                  name={data.name}
                  image={data.image}
                  price={data.price}
                  category={data.category}
                  qty={data.qty}
                />
              </div>
            );
          })}
        </div>
      </div> */}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Product;

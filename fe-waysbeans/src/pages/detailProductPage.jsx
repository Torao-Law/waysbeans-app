import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import formatNumber from "../utils/formatNumber";
import { useParams } from "react-router-dom";
import { findProductsClient, getProduct } from "../hooks/useProduct";
import CardProduct from "../elements/cardProduct";
import useCounter from "../utils/counter";
import apiConfig from "../libs/api";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'

const DetailProductPage = () => {
  const { id } = useParams();
  const { data, isLoading } = getProduct(id);
  const { data: someProduct } = findProductsClient(1, 5);
  const { count, subAmount, decrement, increment } = useCounter(1, data?.price);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const dataCart = {
        product_id : data?.id,
        order: count,
        sub_amount: subAmount 
      }
      await apiConfig.post("/cart", dataCart, config)

      Swal.fire({
        title: 'success!',
        text: 'Success add item to cart!',
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'Show Cart',
      }).then((result) => {
        if (result.value) {
          window.location.href = `/transactions`
        }
      })
    } catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className="px-28 pt-28 grid">
        <div className="grid grid-flow-col content-center">
          <div >
            <img className="w-full h-full  object-fill" src={data?.image} alt="product" />
          </div>

          <div className="ml-14 grid content-between">
            <div>
              <p className="font-bold text-isPrimary text-4xl">{data?.name}</p>
              <p className="break-words text-justify mt-6">
                {data?.description}
              </p>
            </div>

            <div className={"text-xl mt-10 "}>
              <p className={"font-bold"}>Stock : {data?.qty}</p>
              <p className="text-isPrimary">
                <span>{formatNumber(data?.price)}</span>
              </p>
            </div>

            <div>
              <span className={"font-bold"}>Sub Amount : </span>
              <span className={"font-bold"}>{formatNumber(subAmount)}</span>
            </div>

            <div className={"drop-shadow grid grid-cols-10 text-center my-10"}>
              <div
                onClick={decrement}
                className={
                  "bg-red-800  px-6 py-2 rounded-l-lg font-bold text-white cursor-pointer"
                }
              >
                {" "}
                -{" "}
              </div>
              <div className={"bg-gray-200 px-6 py-2 font-bold"}>
                {count}
              </div>
              <div
                onClick={increment}
                className={
                  "bg-isPrimary px-6 py-2 rounded-r-lg text-white font-bold cursor-pointer"
                }
              >
                {" "}
                +{" "}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                className={
                  "border-2 rounded text-isPrimary font-bold border-isPrimary py-3"
                }
                onClick={handleSubmit}
              >
                Add Cart
              </button>
              <button
                className={"bg-isPrimary rounded text-white font-bold py-3"}
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-28 mt-20 mb-6">
        <hr className="border-t border-solid border-gray-300" />
      </div>

      <div className="px-28">
        <h1 className="text-isSecondary font-bold text-xl">Same products</h1>
        <div className="grid grid-cols-5 justify-items-center mt-4">
          {someProduct?.map((item) => {
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
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DetailProductPage;

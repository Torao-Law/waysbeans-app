import React from "react";
import Navbar from "../components/navbar";
import CardChart from "../components/cardChart";
import SubAmount from "../components/subAmount";
import Footer from "../components/footer";
import useCart from "../hooks/useCart";

const TransactionPage = () => {
  const { findCarts } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
      </div>

      <div className="px-28 flex">
        <div className="w-9/12">
          <p className="font-bold text-2xl mb-2 text-isPrimary">
            My Transactions
          </p>

          {!findCarts ? (
            <p>No Items in Cart.</p>
          ) : (
            findCarts?.carts?.map((data) => {
              return (
                <CardChart
                  id={data.id}
                  key={data.id}
                  name={data.product}
                  price={data.price}
                  category={data.category}
                  order={data.order}
                  subAmount={data.sub_amount}
                  image={data.image}
                />
              );
            })
          )}
        </div>

        <div className="ms-4 mt-10 w-3/12">
          <SubAmount total={findCarts?.totalAmount} />
        </div>
      </div>

      <div className="pt-20">
        <Footer />
      </div>
    </div>
  );
};

export default TransactionPage;

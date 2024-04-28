import React from "react";
import formatNumber from "../utils/formatNumber";
import useCart from "../hooks/useCart";

const CardChart = (props) => {
  const { cart, isLoading, setCart, setIdProduct, increaseQty, decreaseQty, deleteProduct } = useCart();

  React.useEffect(() => {
    setCart({
      order: props.order,
      sub_amount: props.order * props.price,
    });

    setIdProduct(props.id);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Now loading ...</div>
      ) : (
        <div className="rounded bg-white flex justify-between p-4 mb-3">
          <div className="flex">
            <div className="w-20 h-20">
              <img
                src={props.image}
                alt="img-chart"
                className="object-cover h-full w-full"
              />
            </div>

            <div className="ms-8">
              <p className="font-bold">{props.name}</p>
              <p>{props.category}</p>
              <p className="text-gray-600 text-sm">
                {formatNumber(props.price)}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <p className="text-end font-bold">
              {formatNumber(cart.sub_amount)}
            </p>

            <div className="flex items-center">
              <div className="me-4 cursor-pointer" onClick={() => deleteProduct.mutate()}>
                <i className="fa-solid fa-trash-can text-red-600"></i>
              </div>

              <div className={"drop-shadow grid grid-cols-3 text-center"}>
                <div
                  onClick={() => decreaseQty(props.price)}
                  className={
                    "p-1 rounded-l-lg font-bold text-isPrimary cursor-pointer border border-isPrimary"
                  }
                >
                  {" "}
                  -{" "}
                </div>

                <div className={"py-1  border-y border-isPrimary w-[40px]"}>
                  {cart.order}
                </div>

                <div
                  onClick={() => increaseQty(props.price)}
                  className={
                    "p-1 rounded-r-lg text-isPrimary font-bold cursor-pointer border border-isPrimary"
                  }
                >
                  {" "}
                  +{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardChart;

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import apiConfig from "../libs/api";

const useCart = () => {
  const queryClient = new QueryClient();
  const [idProduct, setIdProduct] = React.useState();
  const [cart, setCart] = React.useState({
    order: 0,
    sub_amount: 0,
  });

  const { data: findCarts, isLoading, refetch } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      try {
        const res = await apiConfig.get("/carts");
        const total = res?.data?.Data.map((data) => data.sub_amount).reduce(
          (prev, curr) => prev + curr
        );

        return {
          carts: res.data.Data,
          totalAmount: total,
        };
      } catch (error) {
        throw error;
      }
    },
  });

  const updateProduct = useMutation({
    mutationFn: async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        await apiConfig.patch(`/cart/${idProduct}`, cart, config);
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      refetch();
    },
    onError: async (error) => {
      console.error("Mutation error:", error);
    },
  });

  const increaseQty = (price) => {
    const newOrder = cart.order + 1;
    const newSubAmount = price * newOrder;

    setCart({
      order: newOrder,
      sub_amount: newSubAmount,
    });

    updateProduct.mutate({
      order: newOrder,
      sub_amount: newSubAmount,
    });
  };

  const decreaseQty = async (price) => {
    if (cart.order > 1) {
      const newOrder = cart.order - 1;
      const newSubAmount = price * newOrder;

      setCart({
        order: newOrder,
        sub_amount: newSubAmount,
      });

      updateProduct.mutate({
        order: newOrder,
        sub_amount: newSubAmount,
      });
    }
  };

  const deleteProduct = useMutation({
    mutationFn: async () => {
      try {
        await apiConfig.delete(`/cart/${idProduct}`);
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      refetch();
    },
    onError: async (error) => {
      console.error("Mutation error:", error);
    },
  });


  return {
    findCarts,
    isLoading,
    cart,
    setCart,
    setIdProduct,
    increaseQty,
    decreaseQty,
    deleteProduct
  };
};

export default useCart;

import { useMutation } from "@tanstack/react-query";
import React from "react";
import apiConfig from "../libs/api";

const useTransaction = () => {
  const [data, setData] = React.useState({
    total_amount: 0,
  });


  const handleSubmit = useMutation({
    mutationFn: async (e) => {
      try {
        e.preventDefault();

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const res = await apiConfig.patch("/transaction", data, config);

        return res.data.Data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (res) => {
      console.log(res)
      const token = res.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    },
    onError: () => {
      console.log(error);
    },
  });

  return {
    setData,
    handleSubmit,
  };
};

export default useTransaction;

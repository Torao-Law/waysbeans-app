import React from "react";
import formatNumber from "../utils/formatNumber";
import useTransaction from "../hooks/useTransaction";

const SubAmount = ({ total }) => {
  const { setData, handleSubmit } = useTransaction();

  React.useEffect(() => {
    setData({
      total_amount: total,
    });
  }, []);

  React.useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-3tFjdJw5n5jU3SC5";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="rounded bg-white h-36 flex flex-col justify-between p-4">
      <div>
        <h1 className="font-bold text-isPrimary mb-1">Shopping summary</h1>
        <div className="flex justify-between">
          <h1>Total</h1>
          <p className="font-bold">{ total ? formatNumber(total) : "-"}</p>
        </div>
      </div>

      <button
        type="button"
        className="bg-isPrimary text-white rounded-xl font-bold py-2"
        onClick={(e) => handleSubmit.mutate(e)}
      >
        Pay Now
      </button>
    </div>
  );
};

export default SubAmount;

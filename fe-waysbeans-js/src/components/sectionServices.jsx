import React from "react";
import CardServices from "../elements/cardServices";

const SectionServices = () => {
  return (
    <div className="px-28 py-20">
      <div>
        <h1 className="font-bold text-4xl text-isPrimary text-center">
          Our Special{" "}
          <span className="bg-gradient-to-r from-green-400 to-transparent px-2">
            Features
          </span>{" "}
          that make <br />
          you happy
        </h1>
      </div>

      <div className="mt-10 flex justify-center">
        <CardServices />
        <CardServices />
        <CardServices />
      </div>
    </div>
  );
};

export default SectionServices;

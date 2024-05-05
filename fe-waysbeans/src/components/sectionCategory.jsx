import React from "react";
import BoxElement from "../elements/boxElement";
import ImgCoffe from "../assets/img2.jpg";
import ImageElement from "../elements/imgElement";

const SectionCategory = () => {
  return (
    <div className="px-28 flex items-center py-20">
      <div className="flex-1">
        <BoxElement />

        <img
          src={ImgCoffe}
          alt="img-section"
          style={{
            top: 760,
            position: "absolute",
            width: "450px",
            height: "450px",
          }}
        />
      </div>

      <div className="flex-1">
        <h1 className="font-extrabold text-5xl text-isThirty tracking-wide">
          Choose your <br />
          favorite Coffee
        </h1>

        <p className="text-white mt-8 tracking-widest">
          Known for its floral and fruity notes, this coffee hails <br />
          from the birthplace of coffee, Ethiophia, and is highly <br />
          regarded for its unique flavor profile.
        </p>

        <div className="mt-14">
          <button className="bg-isThirty px-8 py-2 rounded-xl text-white font-bold">
            More Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCategory;

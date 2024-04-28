import React from "react";
import ImgCoffe from "../assets/img1.jpg";
import ImgStar from "../assets/img-star1.png";
import ImgStar2 from "../assets/img-star2.png";
import ImageElement from "../elements/imgElement";
import BoxElement from "../elements/boxElement";

const Jumbotron = () => {
  return (
    <div className="px-28 flex mt-28">
      <div className="flex-1">
        <div>
          <h1 className="font-bold text-5xl tracking-wide text-isPrimary leading-tight">
            Indulge in Rich Flavos <br />
            and{" "}
            <span className="bg-gradient-to-r from-green-400 to-transparent px-2">
              Irresistible
            </span>
            <br />
            Aromas
          </h1>

          <p className="text-amber-950 text-lg">
            Coffee comes in various types, each with distinct <br />
            flavors and characteristics.
          </p>
        </div>

        <div className="mt-14">
          <button className="bg-isPrimary px-8 py-2 rounded-xl text-white font-bold">
            Shop Now
          </button>
        </div>

        <div className="flex mt-10">
          <div className="me-20">
            <p className="font-bold text-isPrimary text-3xl">500</p>
            <p className="text-isSecondary text-xl">Ordered</p>
          </div>

          <div className="me-20">
            <p className="font-bold text-isPrimary text-3xl">20</p>
            <p className="text-isSecondary text-xl">Outlet</p>
          </div>

          <div>
            <p className="font-bold text-isPrimary text-3xl">50</p>
            <p className="text-isSecondary text-xl">Community</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
          <BoxElement />
          <ImageElement image={ImgCoffe} />

        <div>
          <img
            className="w-10 absolute z10"
            src={ImgStar2}
            alt="img-bg"
            style={{ right: 0, top: 0 }}
          />
          <img
            className="w-16 z10 absolute opacity-75"
            src={ImgStar}
            alt="img-bg"
            style={{ right: 0, top: 60 }}
          />
          <img
            className="w-10 absolute z10"
            src={ImgStar}
            alt="img-bg"
            style={{ right: 60, top: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

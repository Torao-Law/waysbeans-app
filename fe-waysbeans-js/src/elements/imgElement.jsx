import React from "react";

const ImageElement = ({ image }) => {
  return (
    <div className="w-4/5 h-4/5 absolute top-20 left-0">
      <img
        src={image}
        alt="img-section"
        style={{
          border: "8px solid transparent",
          borderImage: "linear-gradient(to top, rgba(255, 255, 255, 0.3), #3f2001) 1",
        }}
      />
    </div>
  );
};

export default ImageElement;

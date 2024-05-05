import React, { useState } from "react";
import ModalAddProduct from "../../elements/modalAddProduct";

const FormAddProduct = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="border border-2 border-isPrimary w-16 h-16 rounded-full bg-white shadow-2xl fixed z-50"
      >
        <i className="fa-solid fa-plus font-bold text-4xl text-isPrimary"></i>
      </button>

      <ModalAddProduct
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default FormAddProduct;

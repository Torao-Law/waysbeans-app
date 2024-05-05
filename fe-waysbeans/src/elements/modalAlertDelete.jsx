import React from "react";
import Modal from "react-modal";
import { deleteProduct, findProductsAdmin } from "../hooks/useProduct";

const ModalAlertDelete = ({ isOpen, onClose, idProduct }) => {
  const { refetch } = findProductsAdmin()
  const handleDelete = () => {
    onClose(), deleteProduct(idProduct)
  }

  React.useEffect(() => {
    refetch()
  }, [isOpen])

  return (
    <Modal
      className="w-2/5 bg-white p-6 rounded shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-isPrimary text-lg">
            Are you sure you want to delete it ?
          </h1>

          <button
            type="button"
            className="text-white bg-red-800 px-8 py-1 rounded-lg mt-4"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>

        <div className="">
          <button
            type="button"
            className="text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAlertDelete;

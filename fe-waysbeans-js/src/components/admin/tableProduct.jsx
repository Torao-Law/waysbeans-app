import React from "react";
import ModalAlertDelete from "../../elements/modalAlertDelete";
import ModalDetailProduct from "../../elements/modalDetailProduct";
import ModalEditProduct from "../../elements/modalEditProduct";
import { findProductsAdmin } from "../../hooks/useProduct";

const TableProduct = () => {
  const { data: findProduct } = findProductsAdmin();
  const [modalView, setModalView] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [dataSelect, setDataSelected] = React.useState(null);

  const handleModalOpen = (data, type) => {
    const modalFunctions = {
      delete: () => setModalDelete(!modalDelete),
      edit: () =>  setModalEdit(!modalEdit),
      view: () => setModalView(!modalView),
    };
    
    const modalFunction = modalFunctions[type];
    if (modalFunction) {
      modalFunction();
      setDataSelected(data);
    }
  };
  
  const handleModalClose = (type) => {
    const modalFunctions = {
      delete: () => setModalDelete(false),
      edit: () => setModalEdit(false),
      view: () => setModalView(false),
    };
  
    const modalFunction = modalFunctions[type];
    if (modalFunction) {
      modalFunction();
      setDataSelected(null);
    }
  };
  

  return (
    <>
      <table className="w-full bg-white p-2 ">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">No</th>
            <th className="border border-gray-400 p-2">Image</th>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Description</th>
            <th className="border border-gray-400 p-2">Category</th>
            <th className="border border-gray-400 p-2">Qty</th>
            <th className="border border-gray-400 p-2">Price</th>
            <th className="border border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {findProduct?.map((row, rowIndex) => (
            <tr key={rowIndex} className="h-16">
              <td className="border border-gray-400 border p-1 px-2 text-sm text-center align-top w-16">
                {rowIndex + 1}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm w-32 h-28 align-top">
                <img src={row?.image} alt="image-product" />
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm  align-top w-52 ">
                {row?.name}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm align-top ">
                {row?.description}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm text-center align-top w-36">
                {row?.category?.name}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm text-center align-top w-16">
                {row?.qty}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm text-center align-top w-28">
                {row?.price}
              </td>
              <td className="border border-gray-400 border p-1 w-28 align-top">
                <button
                  onClick={() => handleModalOpen(row?.id, "view")}
                  className="bg-white hover:bg-green-200 text-white font-bold px-1 rounded border border-green-700"
                >
                  <i className="fa-regular fa-eye text-green-700 fext-sm"></i>
                </button>
                <button
                  onClick={() => handleModalOpen(row, "edit")}
                  className="bg-white hover:bg-yellow-200 text-white font-bold px-1 rounded ml-2 border border-yellow-700"
                >
                  <i className="fa-solid fa-pencil text-yellow-700 fext-sm"></i>
                </button>
                <button
                  onClick={() => handleModalOpen(row?.id, "delete")}
                  className="bg-white hover:bg-red-200 text-white font-bold px-1 rounded ml-2 border border-red-700"
                >
                  <i className="fa-solid fa-trash text-red-700 fext-sm"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <ModalDetailProduct
          isOpen={modalView}
          onClose={handleModalClose}
          idProduct={dataSelect}
        />

        <ModalEditProduct
          isOpen={modalEdit}
          onClose={() => handleModalClose("edit")}
          data={dataSelect}
        />

        <ModalAlertDelete
          isOpen={modalDelete}
          onClose={() => handleModalClose("delete")}
          idProduct={dataSelect}
        />
      </table>
    </>
  );
};

export default TableProduct;

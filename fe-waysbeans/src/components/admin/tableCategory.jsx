import React from "react";
import ModalAlertDelete from "../../elements/modalAlertDelete";
import ModalDetailProduct from "../../elements/modalDetailProduct";
import ModalEditProduct from "../../elements/modalEditProduct";
import { findCategories } from "../../hooks/useCategory";

const TableCategory = () => {
  const { data: category } = findCategories();
  const [modalView, setModalView] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [idSelected, setIdSelected] = React.useState(null);

  const handleModalOpen = (id, type) => {
    const modalFunctions = {
      delete: () => setModalDelete(!modalDelete),
      edit: () => setModalEdit(!modalEdit),
      view: () => setModalView(!modalView),
    };

    const modalFunction = modalFunctions[type];
    if (modalFunction) {
      modalFunction();
      setIdSelected(id);
    }
  };

  return (
    <>
      <table className="w-3/5 bg-white p-2 mx-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">No</th>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-400 border p-1 px-2 text-sm text-center align-top">
                {rowIndex + 1}
              </td>
              <td className="border border-gray-400 border p-1 px-2 text-sm  align-top">
                {row?.name}
              </td>
              <td className="border border-gray-400 border p-1 align-topv w-28">
                <button
                  onClick={() => handleModalOpen(row?.id, "view")}
                  className="bg-white hover:bg-green-200 text-white font-bold px-1 rounded border border-green-700"
                >
                  <i className="fa-regular fa-eye text-green-700 fext-sm"></i>
                </button>
                <button
                  onClick={() => handleModalOpen(row?.id, "edit")}
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
          onClose={() => setModalView(false)}
          idProduct={idSelected}
        />

        <ModalEditProduct
          isOpen={modalEdit}
          onClose={() => setModalEdit(false)}
        />

        <ModalAlertDelete
          isOpen={modalDelete}
          onClose={() => setModalDelete(!modalDelete)}
          idProduct={idSelected}
        />
      </table>
    </>
  );
};

export default TableCategory;

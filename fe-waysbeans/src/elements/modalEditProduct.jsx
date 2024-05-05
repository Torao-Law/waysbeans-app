import React, { useEffect } from "react";
import Modal from "react-modal";
import InputElement from "./inputElement";
import ImgNoUpload from "../assets/img-noUpload.jpg";
import { useProduct } from "../hooks/useProduct";
import { findCategories } from "../hooks/useCategory";

const ModalUpdateProduct = ({ isOpen, onClose, data }) => {
  const { data: categories } = findCategories();

  const {
    updateProduct,
    handleChange,
    setForm,
    form,
    imgPreview,
    setImgPreview,
  } = useProduct();
  console.log(form)
  
  React.useEffect(() => {
    if (data) {
      setForm({
        id: data?.id,
        name: data?.name,
        qty: data?.qty,
        price: data?.price,
        description: data?.description,
        image: data?.image,
        categoryId: data?.category?.id
      });

      setImgPreview(data?.image);
    }
  }, [data, setForm]);

  const onCancelandCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      className="w-2/5 h-5/6 bg-white p-10 mx-auto rounded shadow-2xl overflow-auto"
      overlayClassName="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 "
      isOpen={isOpen}
      onRequestClose={onCancelandCloseModal}
      ariaHideApp={false}
    >
      <form
        className="grid grid-rows-1  overflow-auto"
        onSubmit={(e) => { updateProduct.mutate(e), onClose()}}
      >
        <div className="row-span-1 w-40">
          <img
            src={
              imgPreview ? imgPreview : data?.image ? data?.image : ImgNoUpload
            }
            alt="add-product"
            className="w-full h-auto"
          />
        </div>

        <div className="row-span-1 mt-2">
          <label htmlFor="name" className="mt-0">
            Name
          </label>
          <InputElement
            name="name"
            type="text"
            value={form?.name}
            onChange={handleChange}
          />
        </div>

        <div className="row-span-1 mt-2">
          <label htmlFor="category" className="mt-0">
            Category
          </label>
          <select
            name="categoryId"
            onChange={handleChange} // Add handleChange event handler
            className="border p-2 rounded-lg border-gray-500 w-full"
            value={form?.categoryId} // Use form.categoryId as value
          >
            {!form?.categoryId && <option hidden>Select category</option>}
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row-span-1 mt-2">
          <label htmlFor="qty" className="mt-0">
            Qty
          </label>
          <InputElement
            name="qty"
            type="text"
            value={form?.qty}
            onChange={handleChange}
          />
        </div>

        <div className="row-span-1 mt-2">
          <label htmlFor="price" className="mt-0">
            Price
          </label>
          <InputElement
            name="price"
            type="text"
            value={form?.price}
            onChange={handleChange}
          />
        </div>

        <div className="row-span-1 mt-2">
          <label htmlFor="name" className="mt-0">
            Description
          </label>
          <textarea
            name="description"
            className="border p-2 rounded-lg border-gray-500 w-full resize-none"
            value={form?.description}
            onChange={handleChange}
          />
        </div>

        <div className="row-span-1 mt-2">
          <label
            className="border border-gray-500 block cursor-pointer text-center p-2 rounded-lg"
            htmlFor="image"
          >
            <i className="fa-solid fa-plus text-gray-500"></i>{" "}
            <span className="text-gray-500">Upload Image</span>
          </label>
          <input
            className="w-full"
            name="image"
            type="file"
            onChange={handleChange}
            id="image"
            hidden
          />
        </div>

        <div className="rows-span-1 flex justify-end mt-8">
          <button
            type="button"
            onClick={onCancelandCloseModal}
            className="border border-red-700 text-red-700 px-8 py-1 rounded-lg me-4"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="text-white bg-isPrimary px-8 py-1 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;

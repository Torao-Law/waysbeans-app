import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import FormAddProduct from "../../components/admin/formAddProduct";
import TableCategory from "../../components/admin/tableCategory";

const ListCategoryPage = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div>
        <Navbar />
      </div>

      <div className="px-28 py-28">
        <h1 className="text-center font-bold text-2xl text-isPrimary mb-4">
          List Category
        </h1>
        <TableCategory />
      </div>

      <div className="absolute bottom-24 right-24">
        <FormAddProduct />
      </div>

      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default ListCategoryPage;

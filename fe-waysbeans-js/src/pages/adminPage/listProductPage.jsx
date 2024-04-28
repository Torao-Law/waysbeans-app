import React from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import FormAddProduct from "../../components/admin/formAddProduct";
import TableProduct from "../../components/admin/tableProduct";

const ListProductPage = () => {
  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className="px-28 py-28">
        <h1 className="text-center font-bold text-2xl text-isPrimary mb-4">
          List Product
        </h1>
        <TableProduct />
      </div>

      <div className="absolute bottom-24 right-24">
        <FormAddProduct />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ListProductPage;

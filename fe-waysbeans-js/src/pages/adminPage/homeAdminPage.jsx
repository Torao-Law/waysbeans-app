import React from "react";
import Navbar from "../../components/navbar";
import TableTransactions from "../../components/admin/tableTransaction";
import Footer from "../../components/footer";

const HomeAdminPage = () => {
  const data = [
    { ID: 1, Buyer: 'Alice', Total: 30, Date: "2024-08-10"},
    { ID: 2, Buyer: 'Bob', Total: 25, Date: "2024-08-10"},
    { ID: 3, Buyer: 'Charlie', Total: 35, Date: "2024-08-10"},
  ];

  const columns = ['ID', 'Buyer', 'Total', "Date"];

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>

      <div className="px-28 pt-28 h-screen">
        <h1 className="text-center font-bold text-2xl text-isPrimary mb-4">
          Transactions
        </h1>
        <TableTransactions data={data} columns={columns} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeAdminPage;

import React from "react";

const TableTransactions = ({ data, columns }) => {
  return (
    <table className="w-full bg-white p-2">
      <thead>
        <tr>
          {columns.map((column, index) => {
            console.log(column);
            return (
              <th
                className={`border border-grey-100 border-2 p-1 ${
                  index === 0 || column == "Date" ? "w-40" : ""
                }`}
                key={index}
              >
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                className={`border border-grey-100 border-2 p-1 px-2 ${
                  colIndex === 0 || column === "Total" || column === "Date"
                    ? "text-center"
                    : ""
                }`}
                key={colIndex}
              >
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTransactions;

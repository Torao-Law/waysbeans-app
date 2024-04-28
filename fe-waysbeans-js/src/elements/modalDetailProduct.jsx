// import React from "react";
// import Modal from "react-modal";
// import { getProduct } from "../hooks/useProduct";

// const ModalDetailProduct = ({ isOpen, onClose, idProduct }) => {
//   // const { data: product } = getProduct(idProduct);

//   return (
//     <Modal
//       className="w-4/5 h-4/5 bg-white p-6 rounded shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//       overlayClassName="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       ariaHideApp={false}
//     >
//       <div className="flex justify-between">
//         <div>
//           <h1 className="mb-8 text-center font-bold text-2xl text-isPrimary">
//             Detail Product
//           </h1>
//           <div>
//             <div className="grid grid-cols-12 gap-6">
//               <div className="col-span-5">
//                 {/* <img src={product?.image} alt="" /> */}
//               </div>

//               <div className="col-span-6">
//                 <div className="flex mb-2">
//                   <div className="flex-1 font-bold">Name:</div>
//                   {/* <div className="flex-1">{product?.name}</div> */}
//                 </div>
//                 <div className="flex mb-2">
//                   <div className="flex-1 font-bold">Category:</div>
//                   {/* <div className="flex-1">{product?.category?.name}</div> */}
//                 </div>
//                 <div className="flex mb-2">
//                   <div className="flex-1 font-bold">Price:</div>
//                   {/* <div className="flex-1">{product?.price}</div> */}
//                 </div>
//                 <div className="flex mb-2">
//                   <div className="flex-1 font-bold">Qty:</div>
//                   {/* <div className="flex-1">{product?.qty}</div> */}
//                 </div>
//                 <div className="flex mb-2">
//                   <div className="flex-1 font-bold">Description:</div>
//                   {/* <div className="flex-1">{product?.description}</div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="">
//           <button
//             type="button"
//             className="text-gray-800 cursor-pointer"
//             onClick={onClose}
//           >
//             <i className="fa-solid fa-x"></i>
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ModalDetailProduct;

import React from "react";
import Modal from "react-modal";
import { getProduct } from "../hooks/useProduct";

const ModalDetailProduct = ({ isOpen, onClose, idProduct }) => {
  const { data: product } = isOpen ? getProduct(idProduct) : {};

  return isOpen ? (
    <Modal
      className="w-4/5 h-4/5 bg-white p-6 rounded shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      isOpen={isOpen}
      onRequestClose={() => onClose("view")}
      ariaHideApp={false}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="mb-8 text-center font-bold text-2xl text-isPrimary">
            Detail Product
          </h1>
          <div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5">
                <img src={product?.image} alt="" />
              </div>

              <div className="col-span-6">
                <div className="flex mb-2">
                  <div className="flex-1 font-bold">Name:</div>
                  <div className="flex-1">{product?.name}</div>
                </div>
                <div className="flex mb-2">
                  <div className="flex-1 font-bold">Category:</div>
                  <div className="flex-1">{product?.category?.name}</div>
                </div>
                <div className="flex mb-2">
                  <div className="flex-1 font-bold">Price:</div>
                  <div className="flex-1">{product?.price}</div>
                </div>
                <div className="flex mb-2">
                  <div className="flex-1 font-bold">Qty:</div>
                  <div className="flex-1">{product?.qty}</div>
                </div>
                <div className="flex mb-2">
                  <div className="flex-1 font-bold">Description:</div>
                  <div className="flex-1">{product?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <button
            type="button"
            className="text-gray-800 cursor-pointer"
            onClick={() => onClose("view")}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ModalDetailProduct;

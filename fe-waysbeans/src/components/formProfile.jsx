import React from "react";
import { UserContext } from "../stores/userContext";

const EditableForm = () => {
  const [state] = React.useContext(UserContext);
  console.log(state);

  return (
    <form className="grid grid-cols-12 gap-12">
      <div className="col-span-5">
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt="img-profile"
        />
      </div>

      <div className="col-span-7">
        <h1 className="text-xl text-isPrimary font-bold mb-4">My Profile</h1>

        <div className="grid grid-cols-12 mt-2">
          <label className="col-span-3" htmlFor="name">
            Name
          </label>
          <input
            className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
            type="text"
            id="name"
          />
        </div>

        <div className="grid grid-cols-12 mt-2">
          <label className="col-span-3" htmlFor="email">
            Email
          </label>
          <input
            className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
            type="text"
            id="email"
          />
        </div>

        <div className="grid grid-cols-12 mt-2">
          <label className="col-span-3" htmlFor="gender">
            Gender
          </label>
          <input
            className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
            type="text"
            id="gender"
          />
        </div>

        <div className="grid grid-cols-12 mt-2">
          <label className="col-span-3" htmlFor="address">
            Address
          </label>
          <textarea
            className="col-span-9 border p-2 rounded-lg border-gray-500 w-full resize-none h-60"
            id="address"
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default EditableForm;

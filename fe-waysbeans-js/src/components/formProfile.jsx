import React, { useState } from "react";

const EditableForm = ({ initialValue, onUpdate }) => {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleUpdateClick = () => {
    onUpdate(value);
    setEditing(false);
  };

  return (
    <form className="grid grid-cols-12 gap-6">
      <div className="col-span-4">
        <img
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt="img-profile"
        />
      </div>

      <div className="col-span-8">
        <div>
          <h1 className="text-xl text-isPrimary font-bold">General</h1>

          <div className="grid grid-cols-12 mt-2">
            <label className="col-span-3" htmlFor="name">
              Name
            </label>
            <input
              className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
              type="text"
              value={value}
              onChange={handleInputChange}
              autoFocus
              id="name"
            />
          </div>

          <div className="grid grid-cols-12 mt-2">
            <label className="col-span-3" htmlFor="gender">
              Gender
            </label>
            <select
              className="col-span-9 p-2 border rounded-lg border-gray-500 w-full"
              value={value}
              onChange={handleInputChange}
              id="gender"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-12 mt-2">
            <label className="col-span-3" htmlFor="address">
              Address
            </label>
            <textarea
              className="col-span-9 border p-2 rounded-lg border-gray-500 w-full resize-none"
              value={value}
              onChange={handleInputChange}
              id="address"
            ></textarea>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-xl text-isPrimary font-bold">Account</h1>

          <div className="grid grid-cols-12 mt-2">
            <label className="col-span-3" htmlFor="email">
              Email
            </label>
            <input
              className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
              type="text"
              value={value}
              onChange={handleInputChange}
              autoFocus
              id="email"
            />
          </div>
          <div className="grid grid-cols-12 mt-2">
            <label className="col-span-3" htmlFor="password">
              Password
            </label>
            <input
              className="col-span-9 border p-2 rounded-lg border-gray-500 w-full"
              type="text"
              value={value}
              onChange={handleInputChange}
              autoFocus
              id="password"
            />
          </div>
        </div>

        <div className="grid justify-items-end mt-10">
          <button
            className="text-white bg-isPrimary px-8 py-1 rounded-lg"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditableForm;

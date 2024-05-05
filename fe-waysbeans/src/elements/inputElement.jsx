import React from 'react';

const InputElement = (props) => {
  const { type, value, onChange, name } = props
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border p-2 rounded-lg border-gray-500 w-full"
    />
  );
};

export default InputElement;

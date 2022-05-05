import React from 'react';

const SizeSelector = ({ value, selectedSize, handleChange }:
     {value: string, selectedSize: string, handleChange: (val:string) => void}) => {
  return (
    <label htmlFor={value} className="size-selector--label">
      <input
        id={value}
        type="radio"
        name="sizes"
        value={value}
        checked={value === selectedSize}
        onChange={() => handleChange(value)}
      />
      <span className="size-selector--box">
        {value}
      </span>
    </label>
  );
};

export default SizeSelector;

import React from 'react';

const Checkbox = ({ checked, handleChange }: {checked: boolean, handleChange: (val: boolean) => void}) => {
  return (
    <label className="input--checkbox" htmlFor="terms">
      <input type="checkbox" id="terms" onChange={({ target }) => handleChange(target.checked)} checked={checked} />
      <span className="checkbox-box">
        <span className="checkbox-marker" />
      </span>
      <span className="checkbox-title">
        ვეთანხმები მოცემულ
        <a href="" className="link">წესებს და პირობებს</a>
      </span>
    </label>
  );
};

export default Checkbox;

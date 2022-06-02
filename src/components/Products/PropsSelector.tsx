const PropsSelector = ({ value, selectedValue, handleChange }:
     {value: string, selectedValue: string, handleChange: (val:string) => void}) => {
  return (
    <label htmlFor={value} className="size-selector--label">
      <input
        id={value}
        type="radio"
        name="sizes"
        value={value}
        checked={value === selectedValue}
        onChange={() => handleChange(value)}
      />
      <span className="size-selector--box">
        {value}
      </span>
    </label>
  );
};

export default PropsSelector;

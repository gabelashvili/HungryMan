const ColorSelector = ({ color, selectedColor, handleChange }:
    {color: string, selectedColor: string, handleChange: (val:string) => void}) => {
  return (
    <label htmlFor={color} className="color-selector--label" style={{ color }}>
      <input id={color} type="radio" value={color} checked={color === selectedColor} onChange={() => handleChange(color)} />
      <span className="color-selector--box" />
    </label>
  );
};

export default ColorSelector;

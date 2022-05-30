const SwitchBox = ({ name, checked, handleChange }: {
    name: string,
     checked: boolean,
      handleChange: () => void
}) => {
  return (
    <label htmlFor={name} className="input--switch">
      <input id={name} type="checkbox" checked={checked} onChange={handleChange} />
      <span className="circle" />
      <span className="input--switch__bg" />
    </label>
  );
};

export default SwitchBox;

const TextField = ({
  value, handleChange, label, inputName, type,
}: PropsTypes) => {
  return (
    <div className="form__group">
      <input className="input" type={type || 'text'} id={inputName} value={value || ''} onChange={({ target }) => handleChange(target.value)} />
      <label className="input--label" htmlFor={inputName}>
        {label}
      </label>
    </div>
  );
};

export default TextField;

interface PropsTypes {
    value: string | number | null,
    handleChange: (val: string) => void,
    label: string,
    inputName: string,
    type?: 'text' | 'password' | 'number'
}

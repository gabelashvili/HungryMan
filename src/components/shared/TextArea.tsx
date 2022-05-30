const TextArea = ({ value, handleChange }: {value?: string, handleChange: (val:string) => void}) => {
  return (
    <textarea className="input input--textarea equal-padding" value={value} onChange={(e) => handleChange(e.target.value)} />
  );
};

export default TextArea;

import { ChangeEvent } from 'react';

const CountSelector = ({ value, handleChange, maxValue }:
    {value: number, handleChange: (val:number) => void, maxValue:number}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    /^[0-9]*$/.test(value) && Number(value) <= maxValue && handleChange(Number(value));
  };
  return (
    <div className="count-selector">
      <button
        className="count-selector--button"
        onClick={(e) => {
          e.preventDefault();
          value > 0 && handleChange(value - 1);
        }}
      >
        <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
          <rect width="14" height="2" fill="currentColor" />
        </svg>
      </button>
      <input className="count-selector--value" onChange={onChange} value={value} />
      <button
        className="count-selector--button"
        onClick={(e) => {
          e.preventDefault();
          value + 1 <= maxValue && handleChange(value + 1);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default CountSelector;

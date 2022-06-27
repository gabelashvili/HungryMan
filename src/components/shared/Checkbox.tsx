import clsx from 'clsx';

const Checkbox = ({
  checked, handleChange, error, handleClick,
}:
     {checked: boolean, handleChange: (val: boolean) => void, error?: boolean, handleClick?: () => void}) => {
  return (
    <label className={clsx('input--checkbox', error && 'has-error')} htmlFor="terms">
      <input type="checkbox" id="terms" onChange={({ target }) => handleChange(target.checked)} checked={checked} />
      <span className="checkbox-box">
        <span className="checkbox-marker" />
      </span>
      <span className="checkbox-title" onClick={handleClick}>
        ვეთანხმები მოცემულ
        <a href="#" className="link">წესებს და პირობებს</a>
      </span>
    </label>
  );
};

export default Checkbox;

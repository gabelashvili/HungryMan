import clsx from 'clsx';

const TextField = ({
  value, handleChange, label, inputName, type, error,
}: PropsTypes) => {
  return (
    <div className="form__group">
      <input
        className={clsx('input', value && value?.toString()?.length > 0 && 'filled', error && 'has-error')}
        type={type || 'text'}
        id={inputName}
        value={value || ''}
        onChange={({ target }) => handleChange(target.value)}
      />
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
    type?: 'text' | 'password' | 'number',
    error?: boolean
}

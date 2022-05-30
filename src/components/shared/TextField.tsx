import clsx from 'clsx';

const TextField = ({
  value, handleChange, label, inputName, type, error, disabled,
}: PropsTypes) => {
  return (
    <div style={{ width: '100%' }}>
      <div className="form__group">
        <input
          style={{ ...!label && { paddingTop: 0, paddingBottom: 0 } }}
          className={clsx('input', value && value?.toString()?.length > 0 && 'filled', error && 'has-error')}
          type={type || 'text'}
          id={inputName}
          value={value || ''}
          onChange={({ target }) => (handleChange ? handleChange(target.value) : undefined)}
          disabled={disabled}
        />
        {label && (
        <label className="input--label" htmlFor={inputName}>
          {label}
        </label>
        )}
      </div>
      {error && typeof error === 'string' && <p className="form__group--error">{error}</p>}
    </div>
  );
};

export default TextField;

interface PropsTypes {
    value: string | number | null,
    handleChange?: (val: string) => void,
    label?: string,
    inputName: string,
    type?: 'text' | 'password' | 'number',
    error?: boolean | string,
    disabled?: boolean
}

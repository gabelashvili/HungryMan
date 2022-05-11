import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useSelector';
import { clearUserAddresses, removeUserAddress } from '../../store/ducks/userDuck';
import { AddressType } from '../../types/user';
import Button from '../shared/Button';

const AddressLabel = ({
  data, checked, handleClick, name, disableSelect, removable,
}: PropsTypes) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRemove = () => {
    setLoading(true);
    dispatch(removeUserAddress(data.id, {
      success: () => {
        setLoading(true);
        dispatch(clearUserAddresses());
      },
      error: () => setLoading(false),
    }));
  };

  return (
    <div className="form__group">
      <label
        className="input--radio radio-selector"
        htmlFor={name}
      >
        <input type="radio" id={name} name="address" checked={checked} onChange={() => handleClick && !disableSelect && handleClick(data)} />
        <div className="address-info">
          <h5 className="address--name">{data.city}</h5>
          <p className="address--description">
            {data.address}
          </p>
        </div>
        {!disableSelect && (
        <span className="radio-box">
          <span className="radio-marker" />
        </span>
        )}
        {removable && (
        <Button type="primary" classes="button--icon is-xs" handleClick={handleRemove} loading={loading}>
          <svg fill="none" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Zm-1.838 2.91c-.24-.25-.57-.39-.91-.39H5.682c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Zm-5.57 9.61h-3.33c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75Zm.84-4h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75Z"
            />
          </svg>
        </Button>
        )}
      </label>
    </div>
  );
};

export default AddressLabel;

interface PropsTypes {
  data: AddressType,
  checked?: boolean,
  handleClick?: (data: any)=> void,
  name: string,
  disableSelect?: boolean,
  removable?: boolean
}

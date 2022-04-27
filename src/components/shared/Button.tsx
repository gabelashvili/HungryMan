import clsx from 'clsx';
import React, { ReactElement } from 'react';
import Loader from '../../Icons/Loader';

const Button = ({
  children, classes, handleClick, loading, type, disabled,
}: PropsTypes) => {
  return (
    <button disabled={disabled || loading} onClick={handleClick} className={clsx(`button button--${type || 'primary'}`, classes)}>
      <div className="button--content" style={{ opacity: loading ? 0 : 1 }}>{children}</div>
      { loading && <div className="button--loader" style={{ opacity: loading ? 1 : 0, position: 'absolute' }}><Loader /></div>}
    </button>
  );
};

export default Button;

interface PropsTypes {
    children: ReactElement | string,
    classes?: string,
    handleClick: () => void,
    loading?: boolean,
    type?: string,
    disabled?: boolean
}

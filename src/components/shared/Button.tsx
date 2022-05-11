import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';
import Loader from '../../Icons/Loader';

const Button = ({
  children, classes, handleClick, loading, type, disabled, id,
}: PropsTypes) => {
  return (
    <button
      id={id}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? handleClick : undefined}
      className={clsx(`button button--${type || 'primary'}`, classes)}
    >
      <div className="button--content" style={{ opacity: loading ? 0 : 1 }}>{children}</div>
      { loading && <div className="button--loader" style={{ opacity: loading ? 1 : 0, position: 'absolute' }}><Loader /></div>}
    </button>
  );
};

export default Button;

interface PropsTypes {
    children: ReactElement | string | ReactNode,
    classes?: string,
    handleClick?: (e:any) => void,
    loading?: boolean,
    type?: string,
    disabled?: boolean,
    id?: string
}

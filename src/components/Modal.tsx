import clsx from 'clsx';
import { ReactElement } from 'react';
import ClearIcon from '../Icons/ClearIcon';
import Button from './shared/Button';

const Modal = ({
  children, open, handleClose, modalTitle, type,
}: PropsType) => {
  return (
    open ? (
      <div>
        <div className={clsx('modal', `modal--${type || 'small'}`)}>
          <div className="modal--header">
            <h3 className="modal--title">{modalTitle}</h3>
            <Button type="text" classes="button--icon is-rounded button-pull-right" handleClick={handleClose}>
              <ClearIcon />
            </Button>
          </div>
          <div className="modal--content">
            {children}
          </div>
        </div>
        <div className="overlay" />
      </div>
    ) : null
  );
};

export default Modal;

interface PropsType {
    children: ReactElement,
    open?: boolean,
    handleClose : () => void,
    modalTitle: string,
    type?: string
}
